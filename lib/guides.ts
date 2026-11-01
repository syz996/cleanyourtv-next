export type GuideSection = {
  h2: string;
  body: string[];
  list?: string[];
  code?: string[];
};

export type Guide = {
  slug: string;
  anchor: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  updated: string;
  sections: GuideSection[];
  faq: { q: string; a: string }[];
};

export const fireTvAds: Guide = {
  slug: 'fire-tv-ads',
  anchor: 'Fire TV ads',
  title: 'Fire TV Ads: What You Can Turn Off',
  description:
    'What Amazon lets you switch off on Fire TV, what stays, and why the Android TV package workflow does not carry over. No root, no launcher swap.',
  h1: 'Fire TV ads: what you can switch off, and what stays',
  lead: 'Fire TV is not Android TV with a different logo. Amazon owns the home screen, and the package-level approach used on Android TV does not carry over. This page covers what actually changes anything, and what is a dead end.',
  updated: '2026-11-02',
  sections: [
    {
      h2: 'The part you can control',
      body: [
        'Amazon groups the relevant switches under the privacy section of Settings. The exact wording and nesting changes between Fire OS versions, so this guide does not print a menu path we cannot verify on your build — look for the items named below.',
        'Turning off interest-based advertising stops the personalisation, not the ads themselves. You will keep seeing placements on the home row and on the screensaver; they simply stop being tailored to your viewing history.',
      ],
      list: [
        'Interest-based / personalised advertising — switch off to stop behavioural targeting.',
        'Advertising ID — reset it if you want to break the existing profile without hunting for every toggle.',
        'Usage and diagnostics sharing — optional, and unrelated to the ads you see, but worth reviewing in the same screen.',
      ],
    },
    {
      h2: 'The part you cannot control',
      body: [
        'Home-screen sponsored placements and screensaver ads are inventory Amazon sells. There is no user-facing opt-out, and no setting that turns the launcher into a plain app grid.',
        'Replacing the launcher is outside the supported range for this site. Sideloaded launchers on Fire OS are reverted or blocked by system updates, which makes any instruction we publish here stale within months.',
      ],
    },
    {
      h2: 'Why the Android TV workflow does not apply',
      body: [
        'Fire OS is an Android fork, but the launcher and the core UI packages are Amazon-signed. Some Amazon-owned packages can be disabled over ADB; disabling the launcher or the system UI leaves the device on a blank home screen that survives a reboot.',
        'We deliberately do not publish a package list for Fire TV. Without a device in hand to test each build, a copied list is how people end up factory-resetting a working TV. The Android TV page on this site only covers devices we can describe step by step.',
      ],
    },
    {
      h2: 'If your goal is a quieter Android TV instead',
      body: [
        'The reversible, package-level workflow this site is built around applies to Android TV and Google TV, not Fire OS. If you have a second set running Google TV, start there.',
      ],
    },
  ],
  faq: [
    {
      q: 'Can I remove Fire TV ads completely?',
      a: 'No. You can stop them being personalised, and you can reduce the amount of viewing data Amazon collects. The sponsored rows and screensaver placements have no user-facing off switch.',
    },
    {
      q: 'Does the Clean Your TV prompt generator work on Fire TV?',
      a: 'Not for the package workflow. The generator produces instructions for Android TV and Google TV devices with ADB access. Fire TV keeps its own launcher and does not accept the same package-level changes safely.',
    },
  ],
};

export const samsungPrivacy: Guide = {
  slug: 'samsung-tv-privacy-settings',
  anchor: 'Samsung TV privacy settings',
  title: 'Samsung TV Privacy Settings Explained',
  description:
    'What the Tizen privacy menu actually controls, what has no opt-out, and why removing ads from a Samsung TV is a different job from an Android TV cleanup.',
  h1: 'Samsung TV privacy settings: what to turn off on Tizen',
  lead: 'Most guides to removing ads from a Samsung TV skip the part that matters: Tizen has no package-level access, so every change happens inside the settings menu. Here is what the switches do, and where the ceiling is.',
  updated: '2026-11-02',
  sections: [
    {
      h2: 'Interest-Based Advertising',
      body: [
        'This is the switch most people are looking for when they search for how to remove ads from a Samsung TV. It sits under Settings › Privacy Choices on current models and stops ads being matched to your viewing behaviour.',
        'It does not remove the ads. Banner and home-screen placements remain; they simply stop following you across sessions and inputs.',
      ],
    },
    {
      h2: 'ACR has no user-facing opt-out',
      body: [
        'Automatic content recognition is the part that watches what is on screen and builds a viewing profile. Samsung does not expose a switch that turns it off entirely on consumer sets.',
        'Resetting the advertising ID is the practical middle ground: it breaks the accumulated profile without pretending the collection stopped. Treat any guide that promises a full ACR off switch as out of date until you have verified it on your own set.',
      ],
    },
    {
      h2: 'Why you cannot just disable the ad packages',
      body: [
        'Tizen does not expose an ADB-equivalent package manager. There is no supported command that disables a preinstalled app the way pm disable-user does on Android TV.',
        'Removing preinstalled apps requires a signed sideload, which voids warranty terms and is reverted by firmware updates. Replacing the launcher is not possible at all.',
      ],
    },
    {
      h2: 'What to do if you also own an Android TV',
      body: [
        'The reversible workflow on this site works on Android TV and Google TV. For a Samsung set, the honest answer is that privacy settings are the whole toolkit — which is exactly what the compatibility table on the home page says.',
      ],
    },
  ],
  faq: [
    {
      q: 'Does turning off Interest-Based Advertising remove ads from a Samsung TV?',
      a: 'No. It stops ads being personalised. Placements on the home screen and in menus remain.',
    },
    {
      q: 'Can I use ADB on a Samsung TV?',
      a: 'Not for this workflow. Tizen does not provide the Android package manager that pm disable-user depends on.',
    },
  ],
};

export const lgWebos: Guide = {
  slug: 'remove-ads-from-lg-tv',
  anchor: 'LG webOS ads and tracking',
  title: 'Remove Ads and Tracking on LG webOS TVs',
  description:
    'Live Plus, AI Recommendations and the honest limits of webOS: what you can switch off on an LG TV and why there is no ADB shortcut.',
  h1: 'Remove ads and tracking on LG webOS TVs',
  lead: 'webOS gives you two meaningful switches and no package manager. That is a shorter list than Android TV, but turning off Live Plus is the single highest-value change on an LG set.',
  updated: '2026-11-02',
  sections: [
    {
      h2: 'Turn off Live Plus',
      body: [
        'Live Plus is LG automatic content recognition. Disabling it is the closest equivalent to the privacy work described on the Android TV page, and it is the one change worth doing first.',
        'The path sits under Settings › General › Additional Settings on webOS 6 and newer. Older releases nest the same item differently, so navigate by the label rather than the depth.',
      ],
    },
    {
      h2: 'Reduce recommendations',
      body: [
        'AI Recommendations and the content suggestion rows run on viewing history. Turning them off removes personalisation, not the rows themselves.',
      ],
      list: [
        'Live Plus — off, stops automatic content recognition.',
        'AI Recommendations — off, stops history-based suggestions where your model exposes the toggle.',
        'Advertising ID reset — breaks the existing ad profile without a full settings sweep.',
      ],
    },
    {
      h2: 'There is no ADB equivalent',
      body: [
        'webOS is not Android. There is no ADB daemon to connect to and no package manager to disable system apps. Developer mode exists for installing your own apps, not for removing LG ones.',
        'This is why LG sits in the unsupported row of the compatibility table. Anything promising a launcher swap or a package-level cleanup on webOS is describing a different platform.',
      ],
    },
  ],
  faq: [
    {
      q: 'Does turning off Live Plus remove ads on an LG TV?',
      a: 'It stops automatic content recognition. Some promotional rows remain, but the tracking that builds a viewing profile is what Live Plus controls.',
    },
    {
      q: 'Can I install the Clean Your TV workflow on webOS?',
      a: 'No. The workflow depends on the Android package manager, which webOS does not have.',
    },
  ],
};

export const adbPair: Guide = {
  slug: 'adb-pair-troubleshooting',
  anchor: 'ADB pair troubleshooting',
  title: 'ADB Pair Troubleshooting for Android TV',
  description:
    'Fix pairing code failures, connection refused and unauthorized device errors when connecting ADB to an Android TV or Google TV set over wireless debugging.',
  h1: 'ADB pair troubleshooting: pairing code, refused and unauthorized',
  lead: 'Almost every ADB failure on a modern Android TV comes down to two ports being confused, or two devices not actually being on the same network. Work through these in order.',
  updated: '2026-11-02',
  sections: [
    {
      h2: 'Pair first, then connect',
      body: [
        'Android 11 and newer split wireless debugging into two ports: a pairing port shown in the pairing dialog, and a connection port shown on the debugging screen. They are different numbers, and the connection port is usually not 5555.',
        'Run the pair command with the pairing port and the six-digit code from the TV, then connect using the port on the debugging screen.',
      ],
      code: [
        'adb pair <TV_IP>:<PAIRING_PORT>',
        'adb connect <TV_IP>:<PORT>',
        'adb devices',
      ],
    },
    {
      h2: 'Connection refused on the same network',
      body: [
        'The TV and the computer must be on the same subnet. Guest networks and router AP isolation block ADB even when both devices show as online and can reach the internet.',
        'If the pair step succeeded but connect is refused, re-open the debugging screen on the TV — the connection port changes when wireless debugging is toggled off and on.',
      ],
    },
    {
      h2: 'Device shows as unauthorized',
      body: [
        'An authorization prompt must be accepted on the TV. If no prompt appeared, toggle wireless debugging off and on, then restart the ADB server on the computer before retrying.',
      ],
      code: ['adb kill-server', 'adb start-server', 'adb devices'],
    },
    {
      h2: 'Before you change anything',
      body: [
        'Once the device list shows an entry ending in "device", record the current package list and keep it. That output is the only reliable reference if you need to reverse a change later.',
      ],
      code: ['adb shell pm list packages'],
    },
  ],
  faq: [
    {
      q: 'Why does adb connect succeed but adb devices show offline?',
      a: 'Usually a stale connection on a changed port. Toggle wireless debugging on the TV, restart the ADB server, and connect again with the current port.',
    },
    {
      q: 'Is port 5555 still used?',
      a: 'Only on older devices with classic network debugging. Android 11 and newer use a randomly assigned port shown on the wireless debugging screen.',
    },
  ],
};

export const allGuides: Guide[] = [fireTvAds, samsungPrivacy, adbPair, lgWebos];
