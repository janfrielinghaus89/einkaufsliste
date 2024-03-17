// Funktion zum Hinzufügen eines Artikels zur Einkaufsliste
function addItem(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars

    // Benutzereingaben erfassen
    var item = document.getElementById('itemInput').value.trim();
    var quantity = document.getElementById('quantityInput').value.trim();
    var unit = document.getElementById('unitSelect').value;
    var category = document.getElementById('categorySelect').value;

    // Überprüfen, ob sowohl Artikel als auch Menge eingegeben wurden
    if (item === '' || quantity === '') {
        alert('Bitte geben Sie einen Artikel und eine Menge ein.');
        return;
    }

    // Neuen Einkaufsartikel erstellen
    var newItem = document.createElement('div');
    newItem.classList.add('shopping-item'); // Klasse für die Kachel
    newItem.classList.add(category); // Klasse für die Kategorie

    // Inhalt der Kachel erstellen
    var itemContent = document.createElement('span');
    itemContent.textContent = quantity + ' ' + unit + ' ' + item;
    newItem.appendChild(itemContent);

    // Erledigt-Button erstellen
    var doneButton = document.createElement('button');
    doneButton.textContent = 'Erledigt';
    doneButton.classList.add('done-button');
    doneButton.onclick = function() {
        // Verhalten bei Button-Druck
        newItem.classList.add('done'); // Füge die Klasse für erledigte Artikel hinzu
        newItem.style.animation = 'moveToEnd 0.3s forwards'; // Starte die Verschiebungsanimation
    };
    newItem.appendChild(doneButton);

    // Löschen-Button erstellen
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Löschen';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = function() {
        // Verhalten bei Button-Druck
        newItem.classList.add('to-be-deleted'); // Füge die Klasse für die Löschanimation hinzu
        setTimeout(function() {
            newItem.remove(); // Entferne das Element aus dem DOM nach der Animation
        }, 300); // Wartezeit für die Animation
    };
    newItem.appendChild(deleteButton);

    // Einkaufsliste auswählen
    var shoppingList = document.getElementById('shoppingList');

    // Einkaufsartikel zur Einkaufsliste hinzufügen, unter Berücksichtigung der Kategorie
    var categoryHeader = shoppingList.querySelector('.' + category + '-header');
    if (!categoryHeader) {
        // Wenn keine Überschrift vorhanden ist, erstelle eine neue
        categoryHeader = document.createElement('h2');
        categoryHeader.textContent = category;
        categoryHeader.classList.add('category', category + '-header');
        shoppingList.appendChild(categoryHeader);
    }

    // Kategorieüberschrift zentrieren
    categoryHeader.style.textAlign = 'center';

    // Einkaufsartikel zur Einkaufsliste hinzufügen
    shoppingList.appendChild(newItem);

    // Eingabefelder zurücksetzen
    document.getElementById('itemInput').value = '';
    document.getElementById('quantityInput').value = '';
    document.getElementById('unitSelect').selectedIndex = 0; // Zurücksetzen auf den Standardwert
}

// Event Listener für das Formular
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('addItemForm').addEventListener('submit', addItem);
});
