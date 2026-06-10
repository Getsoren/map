# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [1.10.0](https://github.com/getsoren/map/compare/1.9.1...1.10.0) (2026-06-10)


### ✨ Features

* zIndex style handling for markers in MapView component ([af42135](https://github.com/getsoren/map/commit/af42135b4f1d3d6064107ba930a6c4cbe5317054))

## [1.9.1](https://github.com/getsoren/map/compare/1.9.0...1.9.1) (2026-06-10)

## [1.9.0](https://github.com/getsoren/map/compare/v1.8.18...v1.9.0) (2026-06-10)


### ✨ Features

* add maxZoom prop to FitBounds for configurable zoom levels ([3af5a76](https://github.com/getsoren/map/commit/3af5a762698a31b12ec428c6d590f14916cf9962))

### [1.8.18](https://github.com/Tracktor/map/compare/v1.8.17...v1.8.18) (2026-03-26)

### [1.8.17](https://github.com/Tracktor/map/compare/v1.8.16...v1.8.17) (2026-03-26)

### [1.8.12](https://github.com/Tracktor/map/compare/v1.8.11...v1.8.12) (2026-01-15)


### 🐛 Fixes

* add customizable anchor positions for markers and popups in MapView ([f5eae1a](https://github.com/Tracktor/map/commit/f5eae1a554c4c67a341ddde786a638948f268013))

### [1.8.11](https://github.com/Tracktor/map/compare/v1.8.10...v1.8.11) (2026-01-14)


### 🐛 Fixes

* set default projection to "mercator" in MapView if not provided ([4fc90c0](https://github.com/Tracktor/map/commit/4fc90c09ae2733ca40351756770f5522c53679d6))

### [1.8.10](https://github.com/Tracktor/map/compare/v1.8.9...v1.8.10) (2025-12-05)


### 🐛 Fixes

* implement EmptyState component for handling WebGL errors in MapView ([8654f48](https://github.com/Tracktor/map/commit/8654f4876dd690c57eae827eda72583ba218a1ef))
* refactor marker handling in MapView for improved readability ([fb3113d](https://github.com/Tracktor/map/commit/fb3113dce24068cd98b10066f76bdeb994a383bd))
* remove unused dev:sandbox script from package.json ([b3a5bb7](https://github.com/Tracktor/map/commit/b3a5bb7f7aa645fac63656ca5d731bbe7a25d729))
* simplify marker onClick handling and deprecate CustomMarkerMapProps ([c4fb51f](https://github.com/Tracktor/map/commit/c4fb51f8a0540980a3ab29c06b57323d780c094b))
* update asset paths and remove unnecessary basename from BrowserRouter ([22a5c56](https://github.com/Tracktor/map/commit/22a5c5691d8d7ae827fd83dfbd82e6c6ce173c13))

### [1.8.9](https://github.com/Tracktor/map/compare/v1.8.8...v1.8.9) (2025-11-20)


### 🐛 Fixes

* handle WebGL errors in MapView with user-friendly message ([7d7f2fc](https://github.com/Tracktor/map/commit/7d7f2fc6dca1709bf9d73ec9de38a9960a66a348))

### [1.8.8](https://github.com/Tracktor/map/compare/v1.8.7...v1.8.8) (2025-11-19)


### 🐛 Fixes

* add PopupContent component for improved tooltip rendering in MapView ([1a77dca](https://github.com/Tracktor/map/commit/1a77dcaef1d2d90859626051ab768ba353f0d2d9))

### [1.8.7](https://github.com/Tracktor/map/compare/v1.8.6...v1.8.7) (2025-11-07)


### 🐛 Fixes

* update borderRadius in MapView for improved styling consistency ([e4dc421](https://github.com/Tracktor/map/commit/e4dc421b9c2d44d9a052603e0c875380a55aa061))

### [1.8.6](https://github.com/Tracktor/map/compare/v1.8.5...v1.8.6) (2025-11-07)


### 🐛 Fixes

* add square prop to MapView in multiple examples for consistent styling ([03e680e](https://github.com/Tracktor/map/commit/03e680e55e3c12f5eb846cf59c33693a5d134efd))

### [1.8.5](https://github.com/Tracktor/map/compare/v1.8.4...v1.8.5) (2025-11-07)


### 🐛 Fixes

* add type prop to Markers component and update defaultMarker in MapView ([f773338](https://github.com/Tracktor/map/commit/f77333806eb34a16f1480e7500e101b9c678aa13))

### [1.8.4](https://github.com/Tracktor/map/compare/v1.8.3...v1.8.4) (2025-11-07)


### 🐛 Fixes

* change marker anchor position from bottom to center ([3a38239](https://github.com/Tracktor/map/commit/3a3823924772dc2aa94c85f9d28c5420f6acbd7a))

### [1.8.3](https://github.com/Tracktor/map/compare/v1.8.2...v1.8.3) (2025-11-07)


### 🐛 Fixes

* size & color marker props ([1a3da73](https://github.com/Tracktor/map/commit/1a3da73e7f6f081abccaabfa8dc03a07b0ab625d))

### [1.8.2](https://github.com/Tracktor/map/compare/v1.8.1...v1.8.2) (2025-11-07)


### 🐛 Fixes

* enhance latitude and longitude validation by adding toNumber utility function ([1d0f4f3](https://github.com/Tracktor/map/commit/1d0f4f301ed5417dd4cfd733f7afe394509da8ba))

### [1.8.1](https://github.com/Tracktor/map/compare/v1.8.0...v1.8.1) (2025-11-07)


### 🐛 Fixes

* add isValidLatLngTuple function to validate latitude and longitude tuples ([18b8f00](https://github.com/Tracktor/map/commit/18b8f008fda7b7d87fd3f4ccae61804f49e9679c))

## [1.8.0](https://github.com/Tracktor/map/compare/v1.7.1...v1.8.0) (2025-11-06)


### ✨ Features

* add latitude and longitude validation functions and enhance MarkerProps type guard ([aa480fe](https://github.com/Tracktor/map/commit/aa480fe5a6386f1aea678ad82c450f5e058f0ca5))

### [1.7.1](https://github.com/Tracktor/map/compare/v1.7.0...v1.7.1) (2025-11-04)

## [1.7.0](https://github.com/Tracktor/map/compare/v1.6.5...v1.7.0) (2025-11-04)


### ✨ Features

* add LineLabel component and refactor itinerary handling in MapView ([776c3d4](https://github.com/Tracktor/map/commit/776c3d4aae3720572a6398f5caa9bbd2c9db398f))
* enhance MapView component with detailed documentation and improve itinerary label display ([796f6eb](https://github.com/Tracktor/map/commit/796f6eb0febe38601d9a761a3ed2dabea8373a31))
* upgrade map ([1756417](https://github.com/Tracktor/map/commit/17564174c28ecbbd9d70a6f5a692bf5d048b65c0))

### [1.6.5](https://github.com/Tracktor/map/compare/v1.6.4...v1.6.5) (2025-10-31)

### [1.6.4](https://github.com/Tracktor/map/compare/v1.6.3...v1.6.4) (2025-10-31)

### [1.6.3](https://github.com/Tracktor/map/compare/v1.6.2...v1.6.3) (2025-10-31)

### [1.6.2](https://github.com/Tracktor/map/compare/v1.6.1...v1.6.2) (2025-10-31)

### [1.6.1](https://github.com/Tracktor/map/compare/v1.6.0...v1.6.1) (2025-10-31)


### 🐛 Fixes

* add ApiReference and CodeExample components, refactor LandingPage structure, and update imports for MapViewProps ([205d1ba](https://github.com/Tracktor/map/commit/205d1bade97273266d9862d75e3d1965f841d6f1))

## [1.6.0](https://github.com/Tracktor/map/compare/v1.5.1...v1.6.0) (2025-10-30)


### ✨ Features

* refactor map components to use MapView and implement ThemeModeProvider for theme management ([c193afe](https://github.com/Tracktor/map/commit/c193afece5e1725ef50508cc425126ad34ab6727))

### [1.5.1](https://github.com/Tracktor/map/compare/v1.5.0...v1.5.1) (2025-10-30)

## [1.5.0](https://github.com/Tracktor/map/compare/v1.4.4...v1.5.0) (2025-10-29)


### ✨ Features

* add isochrone functionality with Mapbox API and integrate into MarkerMap ([6da9ebe](https://github.com/Tracktor/map/commit/6da9ebe6e1cd9e2e77237875e4158ed26deccdf8))

### [1.4.4](https://github.com/Tracktor/map/compare/v1.4.3...v1.4.4) (2025-10-29)


### 🐛 Fixes

* implement Mapbox and OSRM services for routing and nearest point functionality ([23ef134](https://github.com/Tracktor/map/commit/23ef1341bbe9ef2b1634937c2408665d48aa3ffa))

### [1.4.3](https://github.com/Tracktor/map/compare/v1.4.2...v1.4.3) (2025-10-29)

### [1.4.2](https://github.com/Tracktor/map/compare/v1.4.1...v1.4.2) (2025-10-29)

### [1.4.1](https://github.com/Tracktor/map/compare/v1.4.0...v1.4.1) (2025-10-29)

## [1.4.0](https://github.com/Tracktor/map/compare/v1.3.2...v1.4.0) (2025-10-29)


### ✨ Features

* refactor routing logic to use engine type and add mapboxFindNearestPoint service ([f5a3c04](https://github.com/Tracktor/map/commit/f5a3c040c9c3722f6e9c5588c82ce2e5758dd5ad))

### [1.3.2](https://github.com/Tracktor/map/compare/v1.3.1...v1.3.2) (2025-10-29)


### 🐛 Fixes

* enhance MarkerMap and FitBounds components with improved functionality and documentation ([0b9b598](https://github.com/Tracktor/map/commit/0b9b59899f644b55ddc911219cafef4ae1a9d664))

### [1.3.1](https://github.com/Tracktor/map/compare/v1.3.0...v1.3.1) (2025-10-29)

## [1.3.0](https://github.com/Tracktor/map/compare/v1.2.7...v1.3.0) (2025-10-29)


### ✨ Features

* add NearestMarkerExample and integrate nearest marker functionality in MarkerMap ([dcdfd0d](https://github.com/Tracktor/map/commit/dcdfd0d3d5e9fefb619490f3e4888080f5fca490))

### [1.2.7](https://github.com/Tracktor/map/compare/v1.2.6...v1.2.7) (2025-10-27)


### 🐛 Fixes

* add isMapReady state to MarkerMap and use it for conditional rendering ([b29bc65](https://github.com/Tracktor/map/commit/b29bc65bdbefd90046a4a7dc25c4e9330826e9ea))

### [1.2.6](https://github.com/Tracktor/map/compare/v1.2.5...v1.2.6) (2025-10-27)


### 🐛 Fixes

* enhance FitBounds and MarkerMap components for improved popup handling and layout ([f8f254b](https://github.com/Tracktor/map/commit/f8f254b1aaba41f36dcac5e6dd8dd62f16514e96))

### [1.2.5](https://github.com/Tracktor/map/compare/v1.2.4...v1.2.5) (2025-10-27)


### 🐛 Fixes

* update FitBounds component to handle animationKey in useEffect for improved popup functionality ([d5ad9b3](https://github.com/Tracktor/map/commit/d5ad9b32abd479f28adcb6bbb88ed30ba48be067))

### [1.2.4](https://github.com/Tracktor/map/compare/v1.2.3...v1.2.4) (2025-10-27)


### 🐛 Fixes

* replace offset prop with openPopup in FitBounds component for improved functionality ([c2a0241](https://github.com/Tracktor/map/commit/c2a02414364015f2087425bc24a82cb0752137a6))

### [1.2.3](https://github.com/Tracktor/map/compare/v1.2.2...v1.2.3) (2025-10-27)


### 🐛 Fixes

* add offset prop to FitBounds component for improved map positioning ([6b4d7e6](https://github.com/Tracktor/map/commit/6b4d7e6248eb60cad007bb5846caf2593ba5171b))

### [1.2.2](https://github.com/Tracktor/map/compare/v1.2.1...v1.2.2) (2025-10-27)


### 🐛 Fixes

* refactor marker validation logic and improve marker rendering in MarkerMap ([2e5749e](https://github.com/Tracktor/map/commit/2e5749eaee7991e7804ac97a5e440774bea7f7f4))

### [1.2.1](https://github.com/Tracktor/map/compare/v1.2.0...v1.2.1) (2025-10-27)

## [1.2.0](https://github.com/Tracktor/map/compare/v1.1.2...v1.2.0) (2025-10-27)


### ✨ Features

* add customizable itinerary line styles to MarkerMap and RoutesExample ([a9c4eb7](https://github.com/Tracktor/map/commit/a9c4eb7184092db0e8b332be6ffae9cdbbd9de84))
* add DefaultMarker component and update MarkerMap to use it for improved marker rendering ([1007ed3](https://github.com/Tracktor/map/commit/1007ed3fa452016bf25145b8cd487c57e12c9ef9))
* add husky for pre-commit linting and update package dependencies ([17e27cc](https://github.com/Tracktor/map/commit/17e27cce743af67e525dd5f336ea7ff67390f283))
* add openPopup functionality with TextField for marker interaction in MarkerMap ([921bc77](https://github.com/Tracktor/map/commit/921bc77e4b172bf1b20a31d7b6539793b2e1beac))
* add openPopup functionality with TextField for marker interaction in MarkerMap ([4d58ffb](https://github.com/Tracktor/map/commit/4d58ffbd5536307e61701fc8d18788b9e0f2a7fc))
* add openPopupOnHover option and enhance marker interaction in MarkerMap ([d02cb95](https://github.com/Tracktor/map/commit/d02cb957fb57b2f4f975df70b173d02d8e086d23))
* add tests for MarkerMap component and update package.json for testing dependencies ([9325f8e](https://github.com/Tracktor/map/commit/9325f8e68ebcc8b124263a4f9ae413aa54c0e699))
* enhance FeaturesExample with dynamic feature addition and update FitBounds to support features ([cbe74f2](https://github.com/Tracktor/map/commit/cbe74f246c22bd75f5170bd2e7d169dc6126e6b6))
* enhance FitBounds and MarkerMap with animation options and customizable map styles ([d14fcab](https://github.com/Tracktor/map/commit/d14fcabcaf86c6559134519c2419588d72061148))
* enhance marker customization by adding variant support and updating marker generation logic ([a777dad](https://github.com/Tracktor/map/commit/a777dad80122d736e39d357cdc9986c240856710))
* enhance MarkerMap with customizable options and global styles ([6313b0b](https://github.com/Tracktor/map/commit/6313b0b4ad0be34d529cb3d1dc2593125268685f))
* enhance MarkerMap with customizable options and global styles ([cad2c2b](https://github.com/Tracktor/map/commit/cad2c2bc97c18651def5652d0d62026dfbd545e7))
* implement routing with react-router and add examples for markers and routes ([fa24169](https://github.com/Tracktor/map/commit/fa24169af10b64391e68190dae5904a4f848583f))
* implement theme mode toggle in FeaturesExample and MarkersExample components ([0caa135](https://github.com/Tracktor/map/commit/0caa135b29e953a97f73a4d99c2ff3b9d92c9735))
* integrate FitBounds component for automatic map bounds adjustment and update dependencies ([83d95fb](https://github.com/Tracktor/map/commit/83d95fb2e6443a4e29d24eadf92369dbb50392f6))
* integrate react-router for navigation and add RouteExample component with route fetching ([35b68b6](https://github.com/Tracktor/map/commit/35b68b65f13df085f974d071719a0c1adad73ccc))
* introduce BASEMAP constants and update map options to support multiple base map views ([812d9b7](https://github.com/Tracktor/map/commit/812d9b7f31fcef4cd723d3cf34b71cf194b02219))
* refactor MarkerMap component, introduce useMarkerMap hook, and add clustering option in MapViewProps ([e5ce5bd](https://github.com/Tracktor/map/commit/e5ce5bd16e0a05afb64bf5a85d652d7dac0e77e6))
* refactor MarkerMap import path and enhance context management in MapProvider ([1410863](https://github.com/Tracktor/map/commit/1410863c177baf472010c857accfc65ad5ac376d))
* rename FitsBounds to FitsBounds.tsx and enhance CustomMarkerMapProps interface in MarkerProps ([34c51bf](https://github.com/Tracktor/map/commit/34c51bf82a4ef344f196da405b7adfd794a01a55))
* rename MultiCityExample to FeaturesExample and update routing to include features ([92f74f2](https://github.com/Tracktor/map/commit/92f74f273f777f8a2190503d62aa983fd2fd8cfc))
* replace Navbar with LandingPage and update routing for improved navigation ([cd8f748](https://github.com/Tracktor/map/commit/cd8f7488b4fa9ea5fa31187c3a0a4f31637b3a77))
* update DefaultMarker color, improve marker validation, and optimize bounds calculation in FitBounds ([649bcae](https://github.com/Tracktor/map/commit/649bcae984a8e85e7b93cb65946dd6c6d7feef81))
* update lib  ([36ec44c](https://github.com/Tracktor/map/commit/36ec44c47948afe006a668fcfcb5092cc37b17c4))
* update map options to use optional chaining for style and change projection type in MapViewProps ([a966c7d](https://github.com/Tracktor/map/commit/a966c7d922cd8a7989d7c28dd8411300f9753592))
* update Navbar layout and add tooltip support for navigation items ([03910a8](https://github.com/Tracktor/map/commit/03910a896d45b34cbfaf8bc98853ca76b722d5be))
* update Navbar styles for improved layout and spacing ([7d5c7a9](https://github.com/Tracktor/map/commit/7d5c7a9d23254593c056f9f4556a017711703de4))

### [1.1.2](https://github.com/Tracktor/map/compare/v1.1.1...v1.1.2) (2025-10-24)


### 🐛 Fixes

* update @getsoren/biome-config-react to version 1.3.0 in bun.lock and package.json ([5f2e2b9](https://github.com/Tracktor/map/commit/5f2e2b9dcc36c5a73f64c5b3d9c75f0c6ce93311))

### [1.1.1](https://github.com/Tracktor/map/compare/v1.1.0...v1.1.1) (2025-10-24)


### 🐛 Fixes

* remove lint and test step from release workflow ([5067728](https://github.com/Tracktor/map/commit/5067728a763fc5381fbb94afa5f5fd023a985e41))
* update release workflow to use npm for publishing and streamline test execution ([3c75d2f](https://github.com/Tracktor/map/commit/3c75d2f1a79909ebc432149b1defe8091cc3102b))

## 1.1.0 (2025-10-24)


### 🐛 Fixes

* center map ([f70f8fb](https://github.com/Tracktor/map/commit/f70f8fb4d0774dccd8b91da257dfa2d904d8d891))
* center map ([de84174](https://github.com/Tracktor/map/commit/de8417419b7074c5d0479d3d79a6aec37a7a31dd))
* center map improvement ([ef92956](https://github.com/Tracktor/map/commit/ef92956c15057c04cf0a61e5b2716bf39193a76f))
* center with animation without markers ([5c31a64](https://github.com/Tracktor/map/commit/5c31a6478553a893968a05144b6e4fd64c7a947f))
* dark theme tip color ([acb8b88](https://github.com/Tracktor/map/commit/acb8b8828112292f966e7f498809e27a4935d221))
* improvement ([36683ed](https://github.com/Tracktor/map/commit/36683ed870dafefced18f2cd2a48ef3b8878a3c9))
* improvement ([944a42b](https://github.com/Tracktor/map/commit/944a42ba25f1be037dcecde5584871af2bff03b5))
* improvement ([752ffac](https://github.com/Tracktor/map/commit/752ffac5d08a8324d69ee208e4aa05ed7968f896))
* improvement ([7f1995d](https://github.com/Tracktor/map/commit/7f1995d7d5bc5fe6db0df4197976ed136dd44874))
* improvement ([43d9186](https://github.com/Tracktor/map/commit/43d9186a57bbdcaac0a76795a0cbf5c95ba51d19))
* improvement ([5f66831](https://github.com/Tracktor/map/commit/5f66831d62f85b46d7d9ed9b17bb1ba220dfd6ef))
* improvement ([0a8d1a1](https://github.com/Tracktor/map/commit/0a8d1a12d86323002dc0a780819ade8060c5bf1b))
* improvement ([a9ab114](https://github.com/Tracktor/map/commit/a9ab11436905800d53305aa537754a4b9661ddba))
* improvement ([98005dc](https://github.com/Tracktor/map/commit/98005dc93a1b402e486f5d5b76f9a06262ea2922))
* loading skeleton ([6ebed53](https://github.com/Tracktor/map/commit/6ebed5356d255f6ad3466a7eefe54e5bfea54f1e))
* loading skeleton ([c0dcf4b](https://github.com/Tracktor/map/commit/c0dcf4b97f72589345638402b95008ee940968eb))
* loading skeleton ([5ca24ea](https://github.com/Tracktor/map/commit/5ca24ea60ea86f7403389f7b283ca6496dbfd387))
* marker ([e73c900](https://github.com/Tracktor/map/commit/e73c90072426b198d05f5aa353148b3684174dac))
* perf unmount ([493471e](https://github.com/Tracktor/map/commit/493471e0484aa3b5ea5d65a7fca710a714ad5de3))
* performance improvement ([f8d27b4](https://github.com/Tracktor/map/commit/f8d27b4f8e06f5f1846158bd4d6a30b2e3f83b9e))
* popup ([9b27b48](https://github.com/Tracktor/map/commit/9b27b488f07e4706e8db8ea7ce1673383a10ce3b))
* remove console log ([9fea75c](https://github.com/Tracktor/map/commit/9fea75c002166034bde0c76d4f7064ea5174bd35))
* remove console log ([ae76fe1](https://github.com/Tracktor/map/commit/ae76fe176b185126811aa47498b9260dd14c767f))
* style close icon ([a9a1984](https://github.com/Tracktor/map/commit/a9a1984b28b8be82c518d590d5fd50b608021796))
* update zoom behavior and version to 0.5.3 ([d2359ec](https://github.com/Tracktor/map/commit/d2359ec7ab70e21235e45c5705bcc262325e69dc))
* warning map container empty ([8a77707](https://github.com/Tracktor/map/commit/8a77707a8e4c2af2ea48d92badc05488d6a0d873))
* web gl support ([2fdd337](https://github.com/Tracktor/map/commit/2fdd337362a411020b96c9bebd5d0b5258248d90))
* web gl support ([c8aca52](https://github.com/Tracktor/map/commit/c8aca527d00250233b62b162e01f8550a7dcaee7))


### ✨ Features

* add "3d" option to base map view ([6c8b16e](https://github.com/Tracktor/map/commit/6c8b16e15ba8082138eb22c4d169dad05a4464a2))
* add "3d" option to base map view ([6def3ee](https://github.com/Tracktor/map/commit/6def3ee11dabab6c12befd29c850d3b73347b119))
* add base map view options and update map style handling ([d4916f2](https://github.com/Tracktor/map/commit/d4916f2bbb124f403386304f69c1d17de93a5df9))
* add base map view options and update map style handling ([9af6a4e](https://github.com/Tracktor/map/commit/9af6a4e2aff72cd0dc96ab08dec9f3000fe18fed))
* add cooperative gestures and double click zoom options, update version to 0.5.6 ([a04f8d6](https://github.com/Tracktor/map/commit/a04f8d618f9343a227c883b860471b1bb2bd273d))
* add fitBoundsAnimationKey and improvement ([6224853](https://github.com/Tracktor/map/commit/62248538fcd331a185077437de11d19a54eee5e5))
* add fitBoundsAnimationKey and improvement ([4bad01e](https://github.com/Tracktor/map/commit/4bad01e3ba93c31175e694ed25cc23d0c5a7de1f))
* add fitBoundsAnimationKey and improvement ([d6dfa7f](https://github.com/Tracktor/map/commit/d6dfa7f0ce30efac8a18232e55f34d5cab722dfe))
* add onClick functionality to standard markers and bump version to 0.4.1 ([5b8de27](https://github.com/Tracktor/map/commit/5b8de276887c1575398304e7e36e2432eb0c0bfb))
* add onClick handler to markers ([f8100b7](https://github.com/Tracktor/map/commit/f8100b7be642ac142baae0cf396ed78192aa3dfd))
* add projection option ([44b4924](https://github.com/Tracktor/map/commit/44b49242210c68d22a712dd6f6f09b9680a20ca9))
* add projection option ([f42e6a4](https://github.com/Tracktor/map/commit/f42e6a40187203462faf79bb1cb5633b425d4aa9))
* add projection option ([e8de30f](https://github.com/Tracktor/map/commit/e8de30fba5067cf673791459132f0e087e7ecc2f))
* add theme map ([2297e84](https://github.com/Tracktor/map/commit/2297e84b0d8edd8ded73b433f4a519951e86e948))
* add version configuration and update release workflow for improved versioning ([6a04b92](https://github.com/Tracktor/map/commit/6a04b925abd9400599a8793615857ab692228227))
* add zoom activation key option and update version to 0.5.4 ([a43d7f9](https://github.com/Tracktor/map/commit/a43d7f943b649441b1349052caf1fcf1beede7d8))
* bump version to 0.4.0 ([c1e8ccf](https://github.com/Tracktor/map/commit/c1e8ccfb35cfa152a67087841031c6ab76a25e8e))
* enhance marker components with theme support and update dependencies to version 1.0.2 ([7b8af5c](https://github.com/Tracktor/map/commit/7b8af5c738a8a1c4852322684f013a525f50d6ed))
* improve lib v0-3-1 ([12a732b](https://github.com/Tracktor/map/commit/12a732b50fd77124a5a647f537be935a54009bfa))
* improvements ([8bcb292](https://github.com/Tracktor/map/commit/8bcb292009a47476c1eb53387b5ab7f46919653d))
* improvements ([894f3ef](https://github.com/Tracktor/map/commit/894f3efbfa1df3b1e3736ba8a2e907301c746f36))
* improvements ([beb11a3](https://github.com/Tracktor/map/commit/beb11a339e42acce9c98b632a8dc5c408dfa5ca2))
* optimize marker rendering with React portals and improve zIndex handling ([f4e44a0](https://github.com/Tracktor/map/commit/f4e44a0ad18263989d730ad12ee493a5b4558831))
* reduce marker count and add random offset for latitude and longitude ([e88c8a0](https://github.com/Tracktor/map/commit/e88c8a0e61f36ee07f55e06f4ac225c608bd3182))
* reduce marker count and add random offset for latitude and longitude ([385c1a5](https://github.com/Tracktor/map/commit/385c1a51b2958bec5f24a88940175eae2bf92f0a))
* refactor marker handling and introduce a large set of markers for improved performance ([40e90dd](https://github.com/Tracktor/map/commit/40e90dd63587453c5513bf2d680baa30b4759e43))
* remove theme dependency from marker loading and improve marker handling ([111b14d](https://github.com/Tracktor/map/commit/111b14d6888bb85a38eda6e6f60c6485ff56e668))
* update map integration with Mapbox, enhance marker props, and add biome configuration ([f7a7241](https://github.com/Tracktor/map/commit/f7a72410aed1539ca07b4282e06a79fd1108ce35))
* update map interaction options and version to 0.5.5 ([8c675c2](https://github.com/Tracktor/map/commit/8c675c2fd5aa7d497b24e29a51cbdd1959a1bbdc))
* update package.json for Bun compatibility and add release workflow ([827053c](https://github.com/Tracktor/map/commit/827053c7357558e9af576415499d0d954c7ee439))
