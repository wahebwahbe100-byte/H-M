# H&M Bauelemente – komplette Website

Responsive, mehrseitige Website auf Grundlage der bereitgestellten Designvorlage. Reines HTML, CSS und JavaScript; keine Installation und kein Build für die Nutzung erforderlich.

## Öffnen und hochladen

Öffnen Sie `index.html` aus dem Download-Paket im Browser. Auf einem Webhosting laden Sie alle HTML-Dateien, `robots.txt` und den vollständigen Ordner `assets` gemeinsam in das öffentliche Verzeichnis. Die Links funktionieren auch in einem Unterordner.

Enthalten sind 14 HTML-Seiten: Startseite, Leistungen, Über uns, Galerie, Kontakt, sechs Leistungsdetailseiten, Impressum, Datenschutzhinweise und eine Fehlerseite.

## Was funktioniert

- Responsive Darstellung, mobile Navigation und Zurück-nach-oben-Schaltfläche.
- Galerie mit Kategorien, Bildvergrößerung, Pfeilnavigation und Tastaturbedienung.
- FAQ-Bereiche zum Aufklappen.
- Projektanfrage mit Pflichtfeldprüfung, automatischer Leistungsauswahl, Textvorschau, Kopieren und TXT-Download.
- Lokale Bilder, SVG-Symbole und Systemschriften ohne externe Bild- oder Schriftanbieter.

## Vor dem öffentlichen Einsatz ergänzen

Die Kontaktdaten in der Bildvorlage waren Beispielangaben. Deshalb wurden keine erfundenen Telefonnummern, Adressen, Bewertungen oder Kundenreferenzen übernommen.

1. Bestätigte Kontaktdaten in `assets/config.js` hinterlegen. Sobald `contactEmail` gesetzt ist, kann der Besucher seine vorbereitete Nachricht im eigenen E-Mail-Programm öffnen und selbst versenden. Das ist kein serverseitiger Versand.
2. Die sichtbaren Unternehmensdaten, `impressum.html` und `datenschutz.html` für den tatsächlichen Betreiber und das endgültige Hosting vervollständigen. Die beiden Rechtstextseiten sind ausdrücklich gekennzeichnete Entwürfe.
3. Für einen direkten Formularversand muss ein geeigneter Formularserver angebunden werden. Die Vorschau übermittelt keine Anfrage an einen Empfänger.
4. Alle Websitefotos wurden aus dem bereitgestellten Originalmaterial übernommen und als WebP-Dateien optimiert.
5. Nach der Fertigstellung der Unternehmensangaben die `noindex,nofollow`-Metadaten in den HTML-Seiten und die Sperre in `robots.txt` entfernen; die endgültige Domain für Canonical-URLs und Sitemap ergänzen.

## Gestaltung anpassen

Farben und Abstände stehen in `assets/style.css`, die Interaktionen in `assets/app.js`. Die Inhalte jeder Seite sind als echtes HTML vorhanden. Die Datei `IMAGE-PROMPTS.md` dokumentiert die mit dem integrierten Bildgenerator erzeugten Bildmotive und ihre Asset-Pfade.

## Hinweis zur Plattform

Das ist eine eigenständige HTML-Website, kein WordPress- oder Elementor-Export. Für Elementor müssen die Layouts in WordPress übertragen werden.


## Fotos und Hero-Slider (Aktualisierung)
- Die bisherigen generierten Bilddateien wurden durch echte, vom Auftraggeber gelieferte Fotoaufnahmen ersetzt.
- Startseite: genau drei Bilder wechseln automatisch alle 4 Sekunden, inklusive Navigationspunkten.
- Galerie: 88 echte Originalfotografien, nach Themen filterbar mit Vollbildansicht.
- Die Fotos sind als moderne WebP-Dateien inklusive Vorschaugrafiken unter `assets/photos/` gespeichert.
- Sämtliche Unterseiten verwenden ebenfalls die neuen Bilder.

## Logo aktualisiert
Das Hauslogo aus dem bereitgestellten transparenten PNG ersetzt das alte Haus-SVG in Header und Footer auf allen Seiten. Der Text H&M BAUELEMENTE bleibt unverändert. Das Favicon verwendet ebenfalls das neue Motiv.

## FAQ – Startseite
Sechs aufklappbare Fragen wurden unter „Von Ihrer Idee zum guten Gefühl.“ eingefügt. Der Bereich ist responsiv und braucht kein zusätzliches JavaScript.

## Kontakt nur als eigene Seite
Das Anfrageformular wurde von der Startseite entfernt und bleibt nur auf `kontakt.html` verfügbar. Im neuen H&M-Informationsbereich der Startseite führt `Jetzt kontaktieren` jetzt zur separaten Kontaktseite.

## Hero-Fotos auf der Startseite
`assets/photos/projekt-057.webp`, `assets/photos/projekt-079.webp`, `assets/photos/projekt-039.webp` (Wechsel alle 4 Sekunden).


## Desktop-Hero – ursprünglicher Verlauf
- Der Hero ist wieder ein durchgehendes Banner über die gesamte Seitenbreite.
- Überschrift und Schaltflächen liegen wie zuvor über dem dunkelblauen Hintergrund.
- Ein weicher Verlauf mit dezenter Aufhellung verbindet Textbereich und Foto.
- Die korrigierte Größe der Originalfotos und ihre Bildausschnitte bleiben erhalten.
- Drei Bilder wechseln weiterhin alle vier Sekunden. Smartphone-Layout unverändert.
- Desktop-Anpassungen: `assets/hero-layout-final.css`.


## Klarere Leistungsbilder auf der Startseite
- Größere Bildflächen im Verhältnis 4:3 auf Desktop und Tablet; quadratisch auf Smartphones.
- Individuelle Bildpositionen für die vier Hochformatfotos.
- Originalfotos in voller vorhandener Auflösung, ohne Farbfilter und ohne zusätzlichen Hover-Zoom.
- Anpassung nur der sechs Bilder in „Unsere Leistungen“; Hero und Unterseiten unverändert.
- Konfiguration: `assets/service-photos.css`.


## Hero-Hintergründe der Hauptunterseiten
- Die gelieferten Bilder `Leistungen.png`, `uber.png`, `Galerie.png` und `kontakt.png` bilden die Hintergründe der passenden Seiten.
- Texte und Navigation liegen als echtes HTML über den Bildern. Ein heller Verlauf verbessert die Lesbarkeit; der Bildausschnitt und Verlauf passen sich an Smartphones an.
- Die neue Gestaltung ist ausschließlich in `assets/subpage-heroes.css` definiert. Die Startseite und Leistungsdetailseiten behalten ihre Gestaltung.
- Optimierte Bilddateien: `assets/photos/hero-leistungen-background.webp`, `hero-about-background.webp`, `hero-galerie-background.webp`, `hero-contact-background.webp`.


## Weißer Glow für Leistungen und Galerie
Die beiden Hero-Bilder wurden mit dem integrierten Bildwerkzeug überarbeitet: breiter, weicher weißer Verlauf von links, einschließlich des unteren linken Bildbereichs, abgestimmt auf die bereitgestellten Über-uns- und Kontaktmotive. Die rechte Bildhälfte bleibt deutlich sichtbar.

Bearbeitungsbrief für beide Bilder: „Edit the supplied hero photograph. Match the soft milky-white left-hand glow of uber.png and kontakt.png. Leftmost 35% nearly white; smoothly fade through 55–60%, transparent by 72%. Fade bottom-left foliage as well as sky. Preserve architecture, viewpoint, composition and naturally colored right-hand details. No text, logos, borders or sun flares. Panoramic 3:1 output.“


## Mobile Hero-Bilder
Drei hochformatige, mit dem integrierten Bildwerkzeug gestaltete Varianten der bestehenden Motive werden über Picture-Quellen bis 680 px geladen. Texte und Buttons stehen links über dem Bild, als echtes HTML. Desktop-Bilder und Slider-Steuerung bleiben erhalten. Gestaltung: `assets/hero-mobile.css`; Bilder: `assets/photos/hero-mobile-wintergarten.webp`, `hero-mobile-glasatrium.webp`, `hero-mobile-rolllaeden.webp`.

Gestaltungsbrief: Reframe/outpaint each supplied architectural photo as a 2:3 portrait mobile hero. Preserve the recognizable winter garden, glass atrium or roller-shutter facade. Place architecture in the lower half/right, with smooth deep navy negative space at upper-left for white HTML copy. One seamless photograph, no text, logos or UI.


## Unterseiten: Gestaltung passend zum Hauslogo
Die vier kompakten Hero-Bereiche verwenden jetzt Marineblau, Weiß und Stahlblau passend zum Logo. Die früheren Landschaftsmotive wurden durch vorhandene Aufnahmen von Glasbauten und Rollläden ersetzt: Leistungen → projekt-057.webp, Über uns → hero-wintergarten-echt.webp, Galerie → projekt-039.webp, Kontakt → hero-rolllaeden-echt.webp. Der Text bleibt links, das Bild rechts; mobil sorgt eine dunkle Auflage für Lesbarkeit.


## Neue offizielle Gestaltung – Bereich „Über uns & Kontakt“

- Der Abschnitt am Ende der Startseite wurde neu gestaltet: großzügigere Proportionen, hochwertiger Bild-Text-Kontrast, klare Hierarchie und ein eigenständiger Kontaktbereich.
- Die drei Verlinkungen haben jetzt unterschiedliche Ziele: `ueber-uns.html`, `kontakt.html` und `leistungen.html`.
- Optimiert für Desktop, Tablet und Smartphones ab 320 Pixeln; barrierefreundliche Fokusrahmen und weniger Animationen bei entsprechender Systemeinstellung.
- Die neue Gestaltung befindet sich in `assets/hm-official-refresh.css`. Nur `index.html` bindet sie zusätzlich ein; die übrigen Seiten behalten ihr Layout.
- In der Fußzeile wurde „Website-Vorschau“ durch den neutralen Markenslogan ersetzt.
- **Wichtig für die Veröffentlichung:** Kontakt-E-Mail und Unternehmensangaben in `assets/config.js` ergänzen, rechtsrelevante Texte prüfen sowie die im Abschnitt „Vor dem öffentlichen Einsatz ergänzen“ beschriebene Suchmaschinen-Sperre erst nach der inhaltlichen Freigabe entfernen.

## Schlanker Startseiten-Bereich (Update)
Der Abschnitt „Über H&M Bauelemente / Persönliche Beratung“ auf `index.html` wurde in eine kompakte, responsiv gestaltete Leiste umgewandelt. Die Styles stehen in `assets/hm-official-refresh.css`. Die Navigation und übrigen Seiten bleiben unverändert.
