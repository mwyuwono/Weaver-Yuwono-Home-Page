January 25

Below are the complete requirements for the Weaver-Yuwono Family Office website, structured to prioritize the shared design system.

---

## 1. Project Overview & Architecture

The Weaver-Yuwono website will be a responsive, static portfolio built with **Vite**. It will function as a "Consumer" of the `m3-design-v2` library. All UI components must be imported from the library rather than being defined locally.

### Key Goals

* **Modular Architecture:** Use JSON to drive page content.
* **Design System First:** Zero local styling for shared components.
* **Library Parity:** The Design System’s reference page must exactly mirror the components available to the site.

---

## 2. Design System Integration

To ensure the local site stays in sync with your design system during development, use **npm linking**. This allows changes in `m3-design-v2` to reflect instantly on the family office site.

### Instructions to Import the System:

1. **In the `m3-design-v2` directory:**
```bash
npm link

```


2. **In the Weaver-Yuwono project directory:**
```bash
npm link m3-design-v2

```


3. **In your Code:**
Import components and tokens directly from the package:
```javascript
import 'm3-design-v2/components/profile-card';
import { tokens } from 'm3-design-v2/theme';

```



---

## 3. Component & Style Requirements

**Rule:** If a component is needed on the Weaver-Yuwono site, it must first be audited against the `m3-design-v2` library.

### Audit & Creation Workflow:

* **Check Availability:** Search the `m3-design-v2` reference library for a matching component.
* **Create/Update in Library:** If a component is missing (e.g., a "Project Detail Hero"), build it inside the **design system repo**, not the local site.
* **Global Tokens:** All "Luxury/Editorial" tokens (specific typography scales, muted color palettes) must be defined in the design system's `tokens.css` or `theme.js`.

### Required Components (To be defined in `m3-design-v2`):

| Component | Description |
| --- | --- |
| **Monogram Header** | Sticky header with SVG logo and Weaver-Yuwono typography. |
| **Profile Card** | Rounded M3 container for photo, name, role, and bio. |
| **Category List** | A vertical or horizontal list layout for project categories. |
| **Project Card** | A clickable thumbnail card that pulls data from JSON. |
| **Detail Module** | A flexible container for hero images and rich text documentation. |

---

## 4. Content Strategy (JSON Data)

The site will not have hard-coded content. All data will reside in `src/data/site-content.json`.

* **Structure:**
* `members`: Array containing Matt and Stanton's profile details.
* `projects`: Array of objects categorized by type (e.g., "Real Estate", "Venture").


* **Logic:** A local script in the site repo will fetch this JSON and map it to the imported `<m3-card>` and `<m3-profile>` components.

---

## 5. Maintenance of the "Source of Truth"

The `m3-design-v2` reference library (the "catalog" page) is the **master documentation**.

> **Mandatory Update Loop:**
> 1. New requirement identified for Weaver-Yuwono.
> 2. Component developed/modified in `m3-design-v2`.
> 3. **Reference page in `m3-design-v2` updated** to show the new component states (hover, active, mobile).
> 4. Component imported into the Weaver-Yuwono site.
> 
> 

This ensures that any future project you start will have access to the exact same "Editorial" components without rework.

---

## 6. Technical Safeguards

* **Scoped Styles:** Use Shadow DOM in your MWC-based components to prevent local site CSS from "leaking" into the design system elements.
* **Accessibility:** Every component in the library must meet WCAG 2.1 AA standards (color contrast and keyboard navigation).
* **Performance:** Vite should be configured to "Tree-shake" the design system, ensuring only the components used on the site are included in the final build.

---

**Would you like me to generate the initial JSON structure for your `site-content.json` to ensure it aligns with these modular components?**