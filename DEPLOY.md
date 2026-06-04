# Deployment Guide — Portland Sheep Breeders' Group

## Stack

| Layer | Technology |
|-------|-----------|
| Static site generator | [Astro](https://astro.build) v4 |
| CSS framework | [Tailwind CSS](https://tailwindcss.com) v3 |
| CMS | [Decap CMS](https://decapcms.org) v3 (git-based, `/admin/`) |
| Web server | Nginx |
| Members area auth | Nginx `auth_basic` (`.htpasswd`) |

---

## 1. Local development

```bash
cd portland-sheep
npm install
npm run dev          # → http://localhost:4321
```

---

## 2. Build for production

```bash
npm run build        # outputs to dist/
```

---

## 3. Server setup (Ubuntu/Debian)

```bash
# Install Nginx
sudo apt update && sudo apt install -y nginx apache2-utils

# Copy built site
sudo mkdir -p /var/www/portlandsheep
sudo cp -r dist /var/www/portlandsheep/

# Install Nginx config
sudo cp nginx.conf /etc/nginx/sites-available/portlandsheep.com
sudo ln -s /etc/nginx/sites-available/portlandsheep.com \
           /etc/nginx/sites-enabled/portlandsheep.com
sudo rm -f /etc/nginx/sites-enabled/default

# Test and reload
sudo nginx -t && sudo systemctl reload nginx
```

---

## 4. TLS with Let's Encrypt (Certbot)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d portlandsheep.com -d www.portlandsheep.com
```

Certbot will update `nginx.conf` automatically and set up auto-renewal.

---

## 5. Members area — create `.htpasswd` file

The Members area (`/members/`) is protected by HTTP Basic Auth.
Create a separate password file for members:

```bash
# Create the file and add the first user
sudo htpasswd -c /etc/nginx/.htpasswd.members alice

# Add more members (omit -c to avoid overwriting)
sudo htpasswd /etc/nginx/.htpasswd.members bob
sudo htpasswd /etc/nginx/.htpasswd.members carol
```

> **Tip:** Each member should have their own username/password so you can
> revoke access individually when a membership lapses.

---

## 6. CMS admin — create `.htpasswd` file (optional)

The `/admin/` path is also protected by Basic Auth (committee members only).
Use a separate file so committee and member credentials are independent:

```bash
sudo htpasswd -c /etc/nginx/.htpasswd committee_member
```

> Alternatively, use **Netlify Identity** (already wired up in
> `public/admin/index.html`) and remove the `auth_basic` block for `/admin/`
> from `nginx.conf`. Netlify Identity provides email-based login with
> invitation-only access.

---

## 7. Decap CMS — connecting to Git

1. The CMS uses `backend: git-gateway` (see `public/admin/config.yml`).
2. For Netlify hosting: enable **Git Gateway** in Netlify → Site settings → Identity.
3. For self-hosted: use [Decap's self-hosted backend](https://decapcms.org/docs/backends-overview/) or swap to `backend: github` / `backend: gitlab` directly.

Content collections managed by Decap:
- **News & Announcements** — homepage news banner items
- **Show Calendar** — Premier shows with dates, judges, results
- **Marketplace listings** — stock, fleece/wool, merchandise
- **Newsletter Archive** — PDF uploads with metadata
- **Members Area content** — documents, minutes, studbook entries

---

## 8. Adding a new page

1. Create `src/pages/your-page/index.astro`
2. Import and use the `Layout` component
3. Run `npm run build` and redeploy `dist/`

---

## 9. Automated deployment (CI/CD sketch)

```bash
# .github/workflows/deploy.yml (example)
- run: npm ci && npm run build
- run: rsync -avz --delete dist/ user@server:/var/www/portlandsheep/dist/
```

Or use **Netlify** / **Cloudflare Pages** for zero-config deployments
(push to `main` → automatic build & publish). If using Netlify, the
members area will need a different auth approach (Netlify Functions or
Netlify's password protection add-on) since Nginx Basic Auth won't apply.
