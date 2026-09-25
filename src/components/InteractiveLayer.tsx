import React from "react";
import CommandTerminal from "@/components/CommandTerminal";
import AchievementsHud from "@/components/AchievementsHud";
import CyberOverlay from "@/components/CyberOverlay";
import CursorFX from "@/components/fx/CursorFX";
import ConfettiFX from "@/components/fx/ConfettiFX";
import CrtMode from "@/components/CrtMode";
import WelcomeHint from "@/components/WelcomeHint";
import HelpOverlay from "@/components/HelpOverlay";
import MailModal from "@/components/MailModal";

/**
 * Interactive / gamified layer (terminal, games, easter eggs, cursor FX, mail composer).
 * Code-split and mounted by Index once the browser is idle, so none of it
 * competes with the first paint of the actual content.
 */
const InteractiveLayer = () => (
  <>
    <CommandTerminal />
    <AchievementsHud />
    <CyberOverlay />
    <CursorFX />
    <ConfettiFX />
    <CrtMode />
    <WelcomeHint />
    <HelpOverlay />
    <MailModal />
  </>
);

export default InteractiveLayer;
