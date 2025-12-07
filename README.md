# Azure Artifacts NPM Package

A demonstration project showing how to publish npm packages to Azure Artifacts using Azure DevOps pipelines.

## 🚀 Pipeline Options - Choose Based on Your Needs

This project provides **three pipeline configurations** to handle different publishing scenarios:

### ✅ Option 1: Main Pipeline (Default & Recommended)
- **File**: `azure-pipelines.yml`
- **Purpose**: Azure Artifacts publishing only
- **Benefits**: Zero service connections required, works immediately
- **Use when**: You only need Azure Artifacts (most common scenario)

### 🔄 Option 2: Simple Pipeline (Alternative)  
- **File**: `azure-pipelines-simple.yml`
- **Purpose**: Azure Artifacts only (alternative implementation)
- **Benefits**: Clean, minimal configuration
- **Use when**: You prefer a more basic pipeline structure

### ⚙️ Option 3: Advanced Pipeline with npmjs Support
- **File**: `azure-pipelines-npmjs.yml`  
- **Purpose**: Azure Artifacts + npmjs.com dual publishing
- **Requirements**: Must create npmjs service connection first
- **Use when**: You specifically need to publish to both platforms

## ⚠️ Troubleshooting Pipeline Issues

### Service Connection Errors (SOLVED)
If you previously encountered errors like:
```
Step input publishEndpoint references service connection npmjs-connection which could not be found
```

**✅ This is now FIXED**: The main `azure-pipelines.yml` no longer contains any npmjs dependencies.

### Which Pipeline Should I Use?
- **95% of users**: Use `azure-pipelines.yml` (the default)
- **Need npmjs too**: Use `azure-pipelines-npmjs.yml` + create service connection
- **Prefer minimal**: Use `azure-pipelines-simple.yml`

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
