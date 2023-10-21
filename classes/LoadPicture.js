class LoadPicture {
  constructor(pictures) {
    this.url = pictures.url;
    this.area = pictures.area;
    this.pictureNumber = pictures.pictureNumber;
    this.order = pictures.order;
    this.pictures = [];
    this.currentIndex = 0;
  }

  async load() {
    //Création et affichage de l'icône de chargement
    const loadingIcon = document.createElement("img");
    loadingIcon.src = "img/loading.gif";
    const area = document.querySelector(this.area);
    area.appendChild(loadingIcon);

    try {

      //Récupération des données des images
      const response = await fetch(this.url);
      const data = await response.json();

      //Trie des données en fonction de l'ordre
      if (this.order === "ASC") {
        this.photos = data.slice(0, 5000);
      } else if (this.order === "DESC") {
        this.photos = data.slice(0, 5000).reverse();
      }

      //Affichage des images avec la méthode display()
      this.display();
    } catch (error) {
      console.error("Erreur lors du chargement des photos:", error);
    } finally {
      //Supprime l'icône de chargement peut importe l'issue du try
      area.removeChild(loadingIcon);
    }
  }

  //Méthode pour l'affichage des images
  display() {
    const area = document.querySelector(this.area);
    const start = this.currentIndex;
    const endIndex = this.currentIndex + this.pictureNumber;

    for (let i = start; i < endIndex; i++) {
      if (i >= 0 && i < this.photos.length) {
        const photo = this.photos[i];
        const img = document.createElement("img");
        img.src = photo.url;
        img.alt = photo.title;
        area.appendChild(img);
        this.currentIndex++;
      }
    }

    //Création d'un bouton pour afficher plus d'image si il en reste
    if (this.currentIndex < this.photos.length) {
      const loadMoreButton = document.createElement("button");
      loadMoreButton.textContent = "Afficher plus de photo";
      loadMoreButton.addEventListener("click", () => {
        this.display();
        //Supprime le bouton
        area.removeChild(loadMoreButton);
      });
      area.appendChild(loadMoreButton);
    }
  }
}

export { LoadPicture };
