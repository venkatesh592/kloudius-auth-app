const users = new Map(); // email -> {id, name, email, passwordHash}

function delay(ms = 700) { return new Promise(res => setTimeout(res, ms)); }
function hash(pw) { return `#${pw}#`; } // demo only!

export async function fakeSignUp(name, email, password) {
  await delay();
  const lower = email.trim().toLowerCase();
  if (users.has(lower)) throw new Error('Email already registered.');
  const user = { id: Date.now().toString(), name: name.trim(), email: lower, passwordHash: hash(password) };
  users.set(lower, user);
  return { token: `demo-token-${user.id}`, user: { id: user.id, name: user.name, email: user.email } };
}

export async function fakeSignIn(email, password) {
  await delay();
  const lower = email.trim().toLowerCase();
  const u = users.get(lower);
  if (!u || u.passwordHash !== hash(password)) throw new Error('Invalid email or password.');
  return { token: `demo-token-${u.id}`, user: { id: u.id, name: u.name, email: u.email } };
}

export async function fakeSignOut() {
  await delay(200);
  return true;
}
