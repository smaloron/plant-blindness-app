#!/bin/sh

# Génère /usr/share/nginx/html/env.js à partir des variables d'environnement VITE_*
cat <<EOF > /usr/share/nginx/html/env.js
window._env_ = {
  VITE_FIREBASE_API_KEY: "${VITE_FIREBASE_API_KEY}",
  VITE_FIREBASE_AUTH_DOMAIN: "${VITE_FIREBASE_AUTH_DOMAIN}",
  VITE_FIREBASE_PROJECT_ID: "${VITE_FIREBASE_PROJECT_ID}",
  VITE_FIREBASE_STORAGE_BUCKET: "${VITE_FIREBASE_STORAGE_BUCKET}",
  VITE_FIREBASE_MESSAGING_SENDER_ID: "${VITE_FIREBASE_MESSAGING_SENDER_ID}",
  VITE_FIREBASE_APP_ID: "${VITE_FIREBASE_APP_ID}",
};
EOF

exec nginx -g 'daemon off;'