# Reference artwork

The original Fibli demo uses the following two photographs/artworks as its default project scenes:

- **Kilchurn Castle at sunrise**, MHoser, 26 November 2018. [Source](https://commons.wikimedia.org/wiki/File:Kilchurn_Castle_at_sunrise.jpg). [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The Commons thumbnail is displayed with a CSS crop, dimming and blur; the photo and adaptations of the photo retain its license.
- **Das Eismeer** (1823–24), Caspar David Friedrich. Hamburger Kunsthalle. Digital reproduction from The Yorck Project. [Source and public-domain status](https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Das_Eismeer_-_Hamburger_Kunsthalle_-_02.jpg).

The two public example scenes can load their images from Wikimedia Commons. No project content or personal information is uploaded. Image requests use no-referrer, and the CSP permits only Wikimedia's thumbnail path for remote images; remote scripts and arbitrary network access are not enabled. Offline vector covers are used if the image request fails. The application must bundle these assets locally before release to remove the optional network dependency.

Spectrum 2 icon attribution and the license are in `packages/ui/LICENSES`.
