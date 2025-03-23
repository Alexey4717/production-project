const fs = require('fs');
const path = require('path');

const cachePath = path.join(__dirname, '../node_modules/.cache');

try {
    if (fs.existsSync(cachePath)) {
        fs.rmSync(cachePath, { recursive: true, force: true });
        console.log('Cache cleared successfully:', cachePath);
    } else {
        console.log('The cache is already clear');
    }
} catch (err) {
    console.error('Error deleting cache:', err);
    process.exit(1);
}
