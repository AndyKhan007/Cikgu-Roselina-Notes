import { CONFIG } from './config.js';
import { getUser } from './auth.js';

async function call(action, payload = {}) {
  const user = getUser();
  const body = {
    action,
    idToken: user?.idToken || null,
    ...payload
  };
  const res = await fetch(CONFIG.APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || 'Gagal memanggil server');
  return data.data;
}

export const API = {
  // --- Umum ---
  ping:              ()                  => call('ping'),

  // --- Catatan ---
  listNotes:         ()                  => call('listNotes'),
  getNote:           (id)                => call('getNote', { id }),
  saveNote:          (note)              => call('saveNote', { note }),
  deleteNote:        (id)                => call('deleteNote', { id }),

  // --- AI ---
  transcribe:        (audioBase64, mime) => call('transcribe', { audioBase64, mime }),
  translate:         (text, targetLang)  => call('translate', { text, targetLang }),
  updateTranslation: (noteId, targetLang, translatedText) =>
                       call('updateTranslation', { noteId, targetLang, translatedText }),

  // --- Group ---
  listGroups:        ()                  => call('listGroups'),
  listPublicGroups:  ()                  => call('listPublicGroups'),
  getGroup:          (id)                => call('getGroup', { id }),
  saveGroup:         (group)             => call('saveGroup', { group }),
  deleteGroup:       (id)                => call('deleteGroup', { id })
};