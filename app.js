'use strict';
const el = id => document.getElementById(id);
const params = new URLSearchParams(location.search);
let activeGroup = params.get('group') || 'all';
let catalog;
el('search').value = params.get('q') || '';

function node(tag, text, className) {
  const item = document.createElement(tag);
  if (text !== undefined) item.textContent = text;
  if (className) item.className = className;
  return item;
}
function link(label, url) {
  const a = node('a', label);
  // Defense in depth: catalog text is always textContent, and URLs are restricted.
  try { const parsed = new URL(url); if (parsed.protocol !== 'https:') throw new Error(); a.href = parsed.href; }
  catch { return node('span', label + ' unavailable'); }
  return a;
}
function empty(title, description, action, href) {
  const box = node('div', undefined, 'empty');
  box.append(node('h3', title));
  const body = node('div');
  body.append(node('p', description));
  const a = node('a', action); a.href = href; body.append(a); box.append(body);
  return box;
}
function renderProjects(syncURL = true) {
  const query = el('search').value.trim().toLowerCase();
  const records = catalog.projects.filter(p => (activeGroup === 'all' || p.group === activeGroup) && [p.title, p.summary, p.group, ...(p.tags || [])].join(' ').toLowerCase().includes(query));
  for (const button of el('group-filters').children) button.setAttribute('aria-pressed', String(button.dataset.group === activeGroup));
  el('collection-title').textContent = activeGroup === 'all' ? 'All groups' : 'Group ' + activeGroup;
  el('result-count').textContent = records.length + (records.length === 1 ? ' published project' : ' published projects');
  const list = el('project-list'); list.replaceChildren();
  if (!records.length) {
    if (query) {
      const box = empty('No matching projects.', 'Try a different keyword or group. The collection only includes reviewed, published listings.', 'Clear search and show all groups', '#projects');
      box.querySelector('a').addEventListener('click', event => { event.preventDefault(); activeGroup = 'all'; el('search').value = ''; renderProjects(); el('search').focus(); });
      list.append(box);
    } else list.append(empty(activeGroup === 'all' ? 'The next idea belongs here.' : activeGroup + ' is ready for its first project.', 'No projects have been published' + (activeGroup === 'all' ? ' yet.' : ' for this group yet.') + ' When the teaching team reviews your listing, your work will appear here with links to its source and submission version.', 'Be part of the collection', '#publish'));
  }
  for (const p of records) {
    const article = node('article', undefined, 'project');
    article.append(node('span', p.group, 'group'));
    const main = node('div'); main.append(node('h4', p.title));
    if (p.tags?.length) main.append(node('div', p.tags.join(' · '), 'tags'));
    const links = node('div', undefined, 'project-links');
    links.append(link('Source code', p.repository));
    if (p.demo) links.append(link('Try the demo', p.demo));
    links.append(link('Submitted version', p.submission)); main.append(links);
    article.append(main, node('p', p.summary)); list.append(article);
  }
  if (syncURL) {
    const url = new URL(location.href);
    activeGroup === 'all' ? url.searchParams.delete('group') : url.searchParams.set('group', activeGroup);
    query ? url.searchParams.set('q', el('search').value.trim()) : url.searchParams.delete('q');
    history.replaceState(null, '', url);
  }
}
async function load() {
  try {
    const response = await fetch('data/catalog.json');
    if (!response.ok) throw new Error('Catalog request failed');
    catalog = await response.json();
    if (!Array.isArray(catalog.groups) || !Array.isArray(catalog.projects) || !Array.isArray(catalog.students)) throw new Error('Catalog invalid');
    if (!catalog.groups.includes(activeGroup)) activeGroup = 'all';
    el('group-filters').replaceChildren();
    for (const group of ['all', ...catalog.groups]) {
      const b = node('button', group === 'all' ? 'All groups' : group); b.type = 'button'; b.dataset.group = group;
      b.addEventListener('click', () => { activeGroup = group; renderProjects(); }); el('group-filters').append(b);
    }
    el('search').disabled = false;
    renderProjects();
    const students = el('student-list'); students.replaceChildren();
    if (!catalog.students.length) students.append(node('p', 'The portfolio directory is open for submissions. Publish your personal website, then send a listing for instructor or TA review.', 'portfolio-empty'));
    for (const s of catalog.students) {
      const article = node('article', undefined, 'student'); article.append(node('h3', s.name));
      const links = node('div', undefined, 'student-links'); links.append(link('Visit portfolio', s.website), link('GitHub', s.github)); article.append(links); students.append(article);
    }
  } catch {
    el('result-count').textContent = 'Collection unavailable';
    const error = node('div', undefined, 'error');
    error.append(node('h3', 'The collection could not load.'), node('p', 'Check your connection and try again. You can also browse the project listings in the website repository on GitHub.'));
    const retry = node('button', 'Try again'); retry.type = 'button'; retry.addEventListener('click', load); error.append(retry, link('Browse listing records', 'https://github.com/GBU-GEC019F/gbu-gec019f.github.io/tree/main/data'));
    el('project-list').replaceChildren(error);
    el('student-list').replaceChildren(node('p', 'Portfolio listings could not load. Try again using the button above.', 'portfolio-empty'));
  }
}
el('search').addEventListener('input', () => { if (catalog) renderProjects(); });
window.addEventListener('popstate', () => {
  if (!catalog) return;
  const p = new URLSearchParams(location.search); activeGroup = catalog.groups.includes(p.get('group')) ? p.get('group') : 'all'; el('search').value = p.get('q') || ''; renderProjects(false);
});
load();
