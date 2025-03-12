# Adding a Favicon

## Steps to Add a New Favicon

1. **Prepare the Favicon File:**

   - Create an SVG (preferred) or PNG file for the favicon.
   - Ensure the favicon design aligns with the existing ones.

2. **Place the Favicon in the Correct Directory:**

   - Move the favicon file to the `public/favicons/` folder.

3. **Update the Favicon List:**
   - Open the `public/Randomfavicon.js` file.
   - Locate the `const favicons` array.
   - Add the filename to the array, e.g., `'filename.svg'`.

## Modifying the Colors of Existing Favicons

If you need to update the colors of an existing favicon, edit the SVG file and update the hex codes in the following places:

- `fill="#033CD2"`
- `stroke="#FF7800"`

Ensure that the new colors remain consistent with the current favicon theme.
