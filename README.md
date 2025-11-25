# MOP Template Form Generator

## Evaulation Only

This project is currently unlicensed and intended for evaluation and testing purposes.

For questions about usage rights, please contact slcarver@iu.edu


## What Does This Do?

This application helps you create professional Method of Procedure (MOP) documents by:
- Filling out a simple form with equipment details and work steps
- Seeing a live preview of your document as you type
- Automatically converting times to UTC (helpful for distributed teams)
- Downloading a formatted PDF ready to share

No technical knowledge required to use - just fill out the form and download!

---

## What You Need First

Before you start, you'll need to install two programs on your computer. Don't worry - they're free and safe!

### 1. Install Node.js

Node.js lets your computer run the application.

**Steps:**
1. Go to: https://nodejs.org/
2. Click the big green button that says **"Download"** (get the LTS version)
3. Open the downloaded file and follow the installation wizard
4. Keep clicking "Next" with all the default options
5. Click "Finish" when done

**How to check it worked:**
- Windows: Press `Windows Key + R`, type `cmd`, press Enter
- Mac: Press `Command + Space`, type `terminal`, press Enter
- Type: `node --version` and press Enter
- You should see something like `v18.17.0` (the numbers might be different)

### 2. Install Python

Python runs the behind-the-scenes part of the application.

**Steps:**
1. Go to: https://www.python.org/downloads/
2. Click the big yellow button that says **"Download Python"**
3. Open the downloaded file
4. **IMPORTANT:** Check the box that says **"Add Python to PATH"** (Windows only)
5. Click "Install Now"
6. Wait for it to finish and click "Close"

**How to check it worked:**
- Open Command Prompt (Windows) or Terminal (Mac) like you did above
- Type: `python --version` (or `python3 --version` on Mac)
- You should see something like `Python 3.11.5`

> **Note for Mac users:** You might need to use `python3` instead of `python` in all the commands below.

---

## Getting the Application Files

You need to download the application code to your computer.

### Option A: Download as ZIP (Easier)

1. Go to: https://github.com/slcarver09/mop-template
2. Click the green **"<> Code"** button
3. Click **"Download ZIP"**
4. Find the downloaded ZIP file (usually in your Downloads folder)
5. Right-click it and choose "Extract All..." (Windows) or double-click it (Mac)
6. Remember where you extracted it! (Example: `C:\Users\YourName\Downloads\mop-template-main`)

### Option B: Use Git (If you have it installed)

1. Open Command Prompt or Terminal
2. Navigate to where you want the files (example: `cd Documents`)
3. Type: `git clone https://github.com/slcarver09/mop-template.git`
4. Type: `cd mop-template`

---

## ⚙️ Setting Up the Application

Now we need to install the application's dependencies (the extra code it needs to work).

### Step 1: Open Your Project Folder

**Windows:**
1. Open File Explorer
2. Navigate to where you extracted the files
3. Click in the address bar at the top (where it shows the folder path)
4. Type `cmd` and press Enter
5. A black Command Prompt window will open in that folder

**Mac:**
1. Open Terminal
2. Type `cd ` (with a space after cd)
3. Drag the `mop-template` folder into the Terminal window
4. Press Enter

### Step 2: Install Frontend Dependencies

In the Command Prompt or Terminal window, type:
```bash
npm install
```

Press Enter and wait. You'll see lots of text scrolling by - this is normal! It might take 1-2 minutes.

**Success looks like:** You see something like "added 234 packages" and you're back to the command prompt.

**If you see an error:** Make sure Node.js is installed correctly (go back to Step 1).

### Step 3: Install Backend Dependencies

Now we need to set up the backend (the Python part).

Type these commands one at a time:
```bash
cd backend
```
(Press Enter)

**Windows:**
```bash
pip install -r requirements.txt
```

**Mac/Linux:**
```bash
pip3 install -r requirements.txt
```

(Press Enter and wait)

**Success looks like:** You see "Successfully installed Flask..." and similar messages.

**If you see an error:** Make sure Python is installed correctly (go back to Step 1).

After it finishes, go back to the main folder:
```bash
cd ..
```

### Step 4: Create Your Configuration File

The application needs to know where to find things. Let's create a simple configuration file.

1. In your project folder, find the file called `.env.example`
2. Copy it and rename the copy to `.env` (just `.env` - no `.example`)
3. Open `.env` with Notepad (Windows) or TextEdit (Mac)
4. It should look like this:
```env
VITE_API_URL=http://localhost:5000
```

5. Make sure it says exactly that, then save and close it

> **Windows Note:** If you can't see `.env` files, you might need to show file extensions:
> - Open File Explorer
> - Click "View" at the top
> - Check the box that says "File name extensions"

---

## Running the Application

You need to run TWO programs at the same time - the backend (Python) and the frontend (the website). You'll need two separate Command Prompt or Terminal windows.

### Window 1: Start the Backend

1. Open Command Prompt or Terminal in your project folder (like you did in Step 1 of Setup)
2. Type:
```bash
cd backend
```

3. Then type:

**Windows:**
```bash
python app.py
```

**Mac/Linux:**
```bash
python3 app.py
```

4. Press Enter

**Success looks like:** You see something like:
```
* Running on http://127.0.0.1:5000
* Running on http://localhost:5000
```

**Keep this window open!** Don't close it while you're using the application.

### Window 2: Start the Frontend

1. Open a SECOND Command Prompt or Terminal window in your project folder
2. Type:
```bash
npm run dev
```

3. Press Enter

**Success looks like:** You see something like:
```
VITE v4.4.0  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**Keep this window open too!**

### Open the Application

1. Open your web browser (Chrome, Firefox, Safari, Edge - any browser works)
2. Go to: `http://localhost:5173`
3. You should see the MOP Template Form! 🎉

---

##  Using the Application

### Creating Your First MOP

1. **Site Address Section:**
   - Enter your POP code (4 letters like "ASHB")
   - Fill in the street address and city/state/zip

2. **Equipment Location:**
   - Enter the device name, model, and serial number
   - Add more equipment if needed using the blue "Add Additional Equipment" button

3. **Date & Time:**
   - Select the date and time
   - Choose the timezone (this automatically calculates UTC time)
   - Check "Emergency work" if this is urgent

4. **Equipment Needed:**
   - List any tools or parts needed
   - Check "Shipment required" if parts are being shipped

5. **Summary:**
   - Write a brief summary of the work

6. **MOP:**
   - List the step-by-step procedure

7. **Preview:**
   - Watch the right side of the screen - it shows exactly how your PDF will look

8. **Download:**
   - Click the blue "Download PDF" button at the bottom
   - Your PDF will be saved to your Downloads folder

---

##  Stopping the Application

When you're done:

1. Go to each Command Prompt/Terminal window
2. Press `Ctrl + C` (Windows/Linux) or `Command + C` (Mac)
3. Type `Y` if asked to confirm
4. Close the windows
5. Close your browser tab

---

## Troubleshooting

### "Port already in use" error

Someone else is using port 5000 or 5173.

**Fix:**
- Restart your computer
- OR: Close any other programs that might be using these ports

### "Command not found" error

Either Node.js or Python isn't installed correctly.

**Fix:**
1. Go back to "What You Need First" section
2. Reinstall Node.js or Python
3. Restart your Command Prompt/Terminal after installing

### Can't see the .env file

**Windows Fix:**
1. Open File Explorer
2. Click "View" at the top
3. Check "File name extensions"
4. Check "Hidden items"

**Mac Fix:**
1. Open Finder
2. Press `Command + Shift + .` (period)
3. Hidden files will now show

### Nothing happens when I go to localhost:5173

**Check these things:**
1. Is the backend running? (You should see the "Running on http://localhost:5000" message)
2. Is the frontend running? (You should see the "Local: http://localhost:5173" message)
3. Did you type the URL correctly? It's `http://localhost:5173` (not https)

### The form doesn't load data from the backend

**Check:**
1. Make sure the backend is running (Window 1)
2. Check your `.env` file - it should say `VITE_API_URL=http://localhost:5000`
3. Try refreshing the browser page


---

## Additional Information

### Project Structure
```
mop-template/
├── backend/          # Python server files
├── src/              # Application code
├── .env             # Your configuration (don't share this!)
├── .env.example     # Configuration template
└── package.json     # List of dependencies
```

### File Locations

- **Your MOPs:** Downloads folder (wherever your browser saves files)
- **Configuration:** The `.env` file in the main project folder
- **Logs:** The Command Prompt/Terminal windows show any errors

### Security Note

- Never share your `.env` file
- This application runs only on your computer (localhost)
- No data is sent to the internet

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

##  Credits

Created by Sean Carver

---

**Remember:** Both the backend AND frontend need to be running at the same time for the application to work!