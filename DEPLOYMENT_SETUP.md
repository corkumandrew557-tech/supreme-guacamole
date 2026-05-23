# 🚀 Deployment Setup Guide

## Your App is Ready to Deploy!

Everything has been configured automatically. Follow these simple steps to get your app live.

---

## **Step 1: Get Your MongoDB Connection String**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Log in to your account
3. Click on your cluster
4. Click **"Connect"**
5. Choose **"Drivers"** and select **Node.js**
6. Copy the connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/...`)

---

## **Step 2: Add Secrets to GitHub**

1. Go to your repo: https://github.com/corkumandrew557-tech/supreme-guacamole
2. Click **Settings** (top right)
3. Click **Secrets and variables** → **Actions**
4. Click **"New repository secret"** and add these:

### Secret 1: MongoDB URI
- **Name:** `MONGODB_URI`
- **Value:** (Paste your MongoDB connection string from Step 1)

### Secret 2: JWT Secret
- **Name:** `JWT_SECRET`
- **Value:** (Any random string, e.g., `my-super-secret-key-xyz123`)

### Secret 3: Netlify Auth Token
- **Name:** `NETLIFY_AUTH_TOKEN`
- **Value:** Get from https://app.netlify.com/user/applications/personal

### Secret 4: Netlify Site ID
- **Name:** `NETLIFY_SITE_ID`
- **Value:** Get from your Netlify project settings

---

## **Step 3: Push Code to Deploy**

Once all secrets are added:
1. Make any change to your code
2. Push to GitHub (on the `Main` branch)
3. Go to the **Actions** tab in your repo
4. Watch the deployment happen! ✅

---

## **Step 4: Check Your Live App**

- After deployment completes (green checkmark ✅)
- Netlify will give you a live URL
- Your app is LIVE! 🎉

---

## **Need Help?**

If something doesn't work:
1. Check the **Actions** tab for error messages
2. Make sure all secrets are added correctly
3. Contact support or ask for help!

---

**You're all set! Just add the secrets and you're ready to go!** 💪
