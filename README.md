# AURELLE — Cosmetics Website

A 5-page cosmetics website: Home, About, Shop, Gallery, and Contact (with a working query/contact form). Pure HTML/CSS/JS — no build step, so it deploys to Vercel as-is.

## Pages
- `index.html` — Home: hero, categories, bestsellers, brand values, testimonials, newsletter
- `about.html` — Brand story, timeline, values, team
- `shop.html` — Product catalog with category filters (Skincare / Makeup / Fragrance / Haircare)
- `gallery.html` — Filterable photo gallery with a click-to-enlarge lightbox
- `contact.html` — **The query form** + FAQ + contact details

## 1. Make the contact form actually send you messages

The form is wired to **Formspree**, a free service that emails you every submission — no backend code needed.

1. Go to https://formspree.io and create a free account.
2. Create a new form and copy the **Form ID** it gives you (looks like `xkgqzvpz`).
3. In this project, find every line that looks like:
   ```
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   It appears in:
   - `contact.html` (the main query form)
   - `index.html` (the newsletter signup)
4. Replace `YOUR_FORM_ID` with your real ID in both files.
5. Confirm your email with Formspree the first time a test message comes in — that's a one-time step they require.

That's it — every query submitted on the Contact page will land straight in your inbox, and the page shows the visitor a "message received" confirmation without reloading.

**Free tier note:** Formspree's free plan includes 50 submissions/month, which is plenty to start. You can upgrade later if you outgrow it.

## 2. Add your real photos and logo (optional but recommended)

Right now, product and gallery images are generated placeholder gradients in brand colors (`/images/gallery/`) so the site looks complete out of the box. To use real photography:
- Drop your images into `/images/`
- In `shop.html`, replace the `style="background:linear-gradient(...)"` on `.product-media` with an `<img>` tag pointing to your photo
- In `gallery.html`, replace the `src="images/gallery/..."` paths with your own image files (keep the same filenames or update the paths)

## 3. Deploy to Vercel

**Option A — Vercel dashboard (no command line needed)**
1. Go to https://vercel.com and sign in (or create a free account).
2. Click **Add New → Project**.
3. Choose **"Upload"** / drag-and-drop this whole project folder (or connect a GitHub repo — see Option B).
4. Framework preset: choose **"Other"** (it's a static site, no build command needed).
5. Click **Deploy**. Vercel will give you a live `.vercel.app` URL in under a minute.

**Option B — via GitHub (recommended for future edits)**
1. Push this folder to a new GitHub repository.
2. In Vercel, click **Add New → Project → Import Git Repository** and select it.
3. Leave build settings empty/default (static site) and click **Deploy**.
4. Every time you push changes to GitHub, Vercel redeploys automatically.

**Option C — Vercel CLI**
```bash
npm install -g vercel
cd aurelle-cosmetics
vercel
```
Follow the prompts; running `vercel --prod` deploys to your production URL.

## 4. Customize branding

All colors, fonts and spacing are defined once at the top of `css/style.css` under `:root`, so you can restyle the whole site by editing a handful of values there. Site name ("AURELLE"), email, and phone number appear in the header/footer of every page — search and replace them site-wide if you rename the brand.
