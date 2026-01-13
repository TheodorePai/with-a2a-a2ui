/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { Restaurant } from './types.js';

export const restaurantData: Restaurant[] = [
  {
    name: "Xi'an Famous Foods",
    detail: "Spicy and savory hand-pulled noodles.",
    imageUrl: "http://localhost:10002/static/shrimpchowmein.jpeg",
    rating: "★★★★☆",
    infoLink: "[More Info](https://www.xianfoods.com/)",
    address: "81 St Marks Pl, New York, NY 10003"
  },
  {
    name: "Han Dynasty",
    detail: "Authentic Szechuan cuisine.",
    imageUrl: "http://localhost:10002/static/mapotofu.jpeg",
    rating: "★★★★☆",
    infoLink: "[More Info](https://www.handynasty.net/)",
    address: "90 3rd Ave, New York, NY 10003"
  },
  {
    name: "RedFarm",
    detail: "Modern Chinese with a farm-to-table approach.",
    imageUrl: "http://localhost:10002/static/beefbroccoli.jpeg",
    rating: "★★★★☆",
    infoLink: "[More Info](https://www.redfarmnyc.com/)",
    address: "529 Hudson St, New York, NY 10014"
  },
  {
    name: "Mott 32",
    detail: "Upscale Cantonese dining.",
    imageUrl: "http://localhost:10002/static/springrolls.jpeg",
    rating: "★★★★★",
    infoLink: "[More Info](https://mott32.com/newyork/)",
    address: "111 W 57th St, New York, NY 10019"
  },
  {
    name: "Hwa Yuan Szechuan",
    detail: "Famous for its cold noodles with sesame sauce.",
    imageUrl: "http://localhost:10002/static/kungpao.jpeg",
    rating: "★★★★☆",
    infoLink: "[More Info](https://hwayuannyc.com/)",
    address: "40 E Broadway, New York, NY 10002"
  },
  {
    name: "Cafe China",
    detail: "Szechuan food in a 1930s Shanghai setting.",
    imageUrl: "http://localhost:10002/static/mapotofu.jpeg",
    rating: "★★★★☆",
    infoLink: "[More Info](https://www.cafechinanyc.com/)",
    address: "59 W 37th St, New York, NY 10018"
  },
  {
    name: "Philippe Chow",
    detail: "High-end Beijing-style cuisine.",
    imageUrl: "http://localhost:10002/static/beefbroccoli.jpeg",
    rating: "★★★★☆",
    infoLink: "[More Info](https://www.philippechow.com/)",
    address: "33 E 60th St, New York, NY 10022"
  },
  {
    name: "Chinese Tuxedo",
    detail: "Contemporary Chinese in a former opera house.",
    imageUrl: "http://localhost:10002/static/mapotofu.jpeg",
    rating: "★★★★☆",
    infoLink: "[More Info](https://chinesetuxedo.com/)",
    address: "5 Doyers St, New York, NY 10013"
  }
];
