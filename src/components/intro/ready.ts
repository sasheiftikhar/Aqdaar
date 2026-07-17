"use client";

import { createContext, useContext } from "react";

/**
 * Whether entrance animations are allowed to run yet.
 *
 * The landing page's hero animates on mount, not on scroll, so without this it
 * would play out and finish behind the intro loader — leaving a dead, static
 * hero at the exact moment the stairs reveal it. Anything with a one-shot
 * entrance reads this and holds until the intro hands over.
 *
 * Defaults to true: only the intro holds it down, and only on the landing page,
 * so every other page animates the moment it mounts.
 */
export const IntroReadyContext = createContext(true);

export const useIntroReady = () => useContext(IntroReadyContext);
