var map_selected = null;
var item_selected = null;

document.getElementById("notes").value = `15 Blue Chus:
Ganon's Maze Chest:

`;

function checkMapItemConnection() {
  if (map_selected != null && item_selected != null) {
    for (const child of item_selected.children) {
      if (child.nodeName == "P") {
        child.innerText = map_selected.getAttribute("area");
        break;
      }
    }

    if (item_selected.id.startsWith("boss-")) {
      document.getElementById("notes").value +=
        `${item_selected.getAttribute("dungeon")} ->
- ${map_selected.getAttribute("area")}
  -
  -
  -
`;
    }

    map_selected.style["border-color"] = "";
    item_selected.style["border-color"] = "";

    map_selected = null;
    item_selected = null;
  }
}

document
  .querySelectorAll(".sea-sector, .additional-sector")
  .forEach((sector) => {
    sector.addEventListener("click", (e) => {
      if (map_selected == null) {
        sector.style["border-color"] = window
          .getComputedStyle(document.body)
          .getPropertyValue("--fg-color");

        map_selected = sector;
        checkMapItemConnection();
      }
    });

    sector.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (map_selected == null) {
        if (
          [
            "Gale Isle",
            "Dragon Roost Island",
            "Forsaken Fortress",
            "ToTG Sector",
            "Forest Haven",
            "Headstone Island",
          ].includes(sector.getAttribute("area"))
        ) {
          if (sector.getAttribute("entrance") == "true") {
            sector.setAttribute("entrance", "false");
          } else {
            sector.setAttribute("entrance", "true");
          }
        } else {
          navigator.clipboard.writeText(sector.getAttribute("area"));
        }
      } else {
        map_selected.style["border-color"] = "";
        map_selected = null;
      }
    });

    sector.addEventListener("mouseenter", (e) => {
      if (map_selected == null) {
        document.getElementById("hovered-sector-text").innerText =
          sector.getAttribute("area");
      }
    });

    sector.addEventListener("mouseleave", (e) => {
      if (map_selected == null) {
        document.getElementById("hovered-sector-text").innerText = "";
      }
    });
  });

document.querySelectorAll(".item-list").forEach((item) => {
  item.addEventListener("click", (e) => {
    if (item_selected == null) {
      item.style["border-color"] = window
        .getComputedStyle(document.body)
        .getPropertyValue("--fg-color");

      document.getElementById("hovered-sector-text").innerText = "";

      item_selected = item;
      checkMapItemConnection();
    }
  });

  item.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    if (item_selected == null) {
      for (const child of item.children) {
        if (child.nodeName == "P") {
          child.innerText = "";
          break;
        }
      }
    } else {
      item_selected.style["border-color"] = "";
      item_selected = null;
    }
  });
});
