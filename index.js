#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

function generateFileTree(dir, indent = '') {
    let result = '';
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            result += `${indent}${file}/\n`;
            result += generateFileTree(filePath, indent + '  ');
        } else {
            result += `${indent}${file}\n`;
        }
    });

    return result;
}

const currentDir = process.cwd();
const outputPath = path.join(currentDir, 'file-tree.txt');

try {
    const fileTree = generateFileTree(currentDir);
    fs.writeFileSync(outputPath, fileTree);
    console.log('File tree generated successfully at:', outputPath);
} catch (error) {
    console.error('Error generating file tree:', error.message);
}