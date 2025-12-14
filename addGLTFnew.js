const fs = require("fs");
const path = require("path");

const spherePath = path.join(__dirname, "uploads", "proba", "devDefault.gltf"); // blender file
const boxPath = path.join(__dirname, "uploads", "proba", "spavacaProba.gltf");// development file

// Проверяем наличие файлов
if (!fs.existsSync(spherePath)) {
    console.error("❌ Файл не найден:", spherePath);
    process.exit(1);
}
if (!fs.existsSync(boxPath)) {
    console.error("❌ Файл box.gltf не найден:", boxPath);
    process.exit(1);
}

// Читаем оба файла
const sphere = JSON.parse(fs.readFileSync(spherePath, "utf-8"));
const box = JSON.parse(fs.readFileSync(boxPath, "utf-8"));

// Сохраняем extras из box
const boxExtras = box.scenes?.[0]?.extras
    ? JSON.parse(JSON.stringify(box.scenes[0].extras))
    : null;

// 🔁 Копируем модельные данные
const propsToCopy = [
    "meshes",
    "nodes",
    "materials",
    "accessors",
    "bufferViews",
    "buffers",
    "textures",
    "images",
    "scenes",
    "scene"
];

for (const key of propsToCopy) {
    if (sphere[key]) box[key] = sphere[key];
}

// Возвращаем extras обратно
if (box.scenes && box.scenes[0]) {
    box.scenes[0].extras = boxExtras || {};
}

// Дополнительная пометка (можно удалить)
box.extras = box.extras || {};
box.extras.lastUpdatedFrom = "sphere.gltf";

// Записываем обратно в box.gltf
fs.writeFileSync(boxPath, JSON.stringify(box, null, 2), "utf-8");

console.log("✅ Модель из sphere.gltf успешно вставлена в box.gltf (extras сохранены)");
