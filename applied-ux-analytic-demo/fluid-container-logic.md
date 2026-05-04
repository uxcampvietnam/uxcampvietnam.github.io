# Fluid Container Logic Documentation

This document explains the mechanism used to trap and release fluid within DOM elements using `activeContainers` and `activeContainingContainers` in the WebGL fluid simulation.

## Core Variables

| Variable | Type | Purpose |
| :--- | :--- | :--- |
| `activeContainers` | `Set<HTMLElement>` | Tracks which elements are currently functioning as fluid containers. |
| `activeContainingContainers` | `Set<HTMLElement>` | **The Trap Mechanism.** Used to invert the obstacle mask, physically trapping fluid inside the element bounds. |

---

## 1. The "Trap" Mechanism (Rendering)

The most critical logic resides in `renderObstacleMask()`. When `activeContainingContainers` has elements, the simulation inverts its usual obstacle rendering:

1.  **Global Obstacle**: It fills the entire simulation area with a solid obstacle.
2.  **Punching Holes**: It uses `destination-out` compositing to draw the shapes of elements in `activeContainingContainers`.
3.  **Result**: The fluid is physically blocked from leaving the element because the "world" outside the element has become a solid wall.

```javascript
// Simplified logic from renderObstacleMask()
if (activeContainingContainers.size > 0) {
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // Fill entire canvas with obstacle
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.globalCompositeOperation = 'destination-out'; // Prepare to "cut out" shapes
    activeContainingContainers.forEach(el => {
        // Draw the element shape to create a "hole" in the obstacle
        ctx.fillRect(drawX, drawY, drawWidth, drawHeight);
    });
}
```

---

## 2. Function: `fluidToContainer(el)`

Triggered when the mouse **leaves** a container. It "fills" the element with fluid and then solidifies it.

1.  **Activate Trap**: Adds the element to `activeContainers` and `activeContainingContainers`.
2.  **Fluid Burst**: Generates a high-density "splat" of fluid particles inside the element's bounding box.
3.  **Release Timer**: After 300ms:
    *   Makes the HTML element visible (`opacity: 1`).
    *   Removes the element from `activeContainingContainers`, effectively "opening the walls" so the internal fluid can interact with the outside world again.

---

## 3. Function: `containerToFluid(el)`

Triggered when the mouse **enters** a container. It "dissolves" the element back into the fluid simulation.

1.  **Deactivate Trap**: Immediately removes the element from both `activeContainers` and `activeContainingContainers`.
2.  **Visual Hide**: Sets the HTML element's opacity to `0` so the underlying WebGL fluid is visible.
3.  **Burst Transition**: (Optional) Adds a small burst of fluid to simulate the element turning into liquid.

---

## State Transition Summary

| Event | `activeContainers` | `activeContainingContainers` | HTML Element | Fluid Behavior |
| :--- | :--- | :--- | :--- | :--- |
| **Mouse Leave** | Added | Added → (300ms) → Removed | Hidden → Visible | Trapped inside → Released |
| **Mouse Enter** | Removed | Removed | Hidden | Free-flowing |
