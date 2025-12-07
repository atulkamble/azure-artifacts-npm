**basic NPM project code** — 

---

# ✅ **1. Create Folder**

```bash
git clone https://github.com/atulkamble/azure-artifacts-npm.git
cd azure-artifacts-npm
```

---

# ✅ **2. Initialize NPM**

```bash
npm init -y
```

This creates **package.json**.

---

# ✅ **3. Create a simple JS file**

### **index.js**

```javascript
function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet("World"));
module.exports = greet;
```

---

# ✅ **4. Add a simple script in package.json**

Replace your `"scripts"` section with:

```json
"scripts": {
    "start": "node index.js"
}
```

---

# ✅ **5. Install one small dependency (optional)**

```bash
npm install lodash
```

Update **index.js** if you want to use it:

```javascript
const _ = require("lodash");

const name = "World";
console.log(_.upperCase(`hello ${name}`));
```

---

# ✅ **6. Run the app**

```bash
npm start
```

Output:

```
Hello, World!
```

---

# 🎁 **BONUS: Minimal package for publishing to Azure Artifacts**

### package.json (very basic)

```json
{
  "name": "@cloudnautic/hello-npm",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "start": "node index.js"
  }
}
```

Then publish:

```bash
npm publish
```

---
