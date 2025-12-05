const fs = require('fs');
const path = require('path');

// Función para escribir archivos
function writeFile(filePath, content) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content);
    console.log(`✓ Creado: ${filePath}`);
}

// Crear estructura de directorios
const directories = [
    'src/models',
    'src/services',
    'src/validators',
    'src/components/movie-list',
    'src/components/movie-detail',
    'src/components/search',
    'src/shared'
];

directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`✓ Directorio creado: ${dir}`);
    }
});

// Archivo package.json actualizado
const packageJson = {
    "name": "cineapp",
    "main": "app/app.js",
    "version": "1.0.0",
    "private": true,
    "dependencies": {
        "@angular/animations": "~13.0.0",
        "@angular/common": "~13.0.0",
        "@angular/compiler": "~13.0.0",
        "@angular/core": "~13.0.0",
        "@angular/forms": "~13.0.0",
        "@angular/platform-browser": "~13.0.0",
        "@angular/platform-browser-dynamic": "~13.0.0",
        "@angular/router": "~13.0.0",
        "@nativescript/angular": "~13.0.0",
        "@nativescript/core": "~8.3.0",
        "@nativescript/ui-listview": "^9.1.0",
        "@nativescript/ui-sidedrawer": "^9.0.4",
        "@triniwiz/nativescript-toasty": "^5.0.0",
        "reflect-metadata": "~0.1.13",
        "rxjs": "~7.4.0",
        "zone.js": "~0.11.5"
    },
    "devDependencies": {
        "@nativescript/android": "8.3.1",
        "@nativescript/ios": "8.3.0",
        "@nativescript/types": "~8.3.0",
        "@nativescript/webpack": "~5.0.0",
        "@angular/compiler-cli": "~13.0.0",
        "@ngtools/webpack": "~13.0.0",
        "typescript": "~4.6.0"
    }
};

writeFile('package.json', JSON.stringify(packageJson, null, 2));

console.log('\n✅ Proyecto configurado!');
console.log('\nPasos siguientes:');
console.log('1. Ejecuta: npm install');
console.log('2. Copia los archivos de código proporcionados anteriormente');
console.log('3. Ejecuta: ns run android (o ns run ios)');