
import lol_news from "../data/lol/lol_news_list.json" assert { type: 'json' };
import tft_news from "../data/tft/tft_news_list.json" assert { type: 'json' };

import tft_guides from "../data/tft/guides/tft_guides_data.json" assert { type: 'json' };

import tft_prog from "../data/tft/programmation/tft_programmation.json" assert { type: 'json' };
import lol_prog from "../data/lol/programmation/lol_programmation.json" assert { type: 'json' };

import tft_team from "../data/tft/team/tft_team.json" assert { type: 'json' };
import lol_team from "../data/lol/team/lol_team.json" assert { type: 'json' };

import lol_results from "../data/lol/resultats/results.json" assert { type: 'json' };
import tft_results from "../data/tft/resultats/results.json" assert { type: 'json' };

import youtube_channels from "../data/youtube_channels.json" assert { type: 'json' };

////////// IMPORT CONST DATA //////////

export const lol_news_list = lol_news.news
export const tft_news_list = tft_news.news

export const tft_guides_list = tft_guides.data

export const tft_prog_list = tft_prog.programmation
export const lol_prog_list = lol_prog.programmation

export const tft_team_list = tft_team.team
export const lol_team_list = lol_team.team

export const lol_results_list = lol_results.results
export const tft_results_list = tft_results.results

export const youtube_channels_list = youtube_channels.channels

////////// TWITCH API  CREDS //////////
export const URL_LIVE_STATUS = "https://api.twitch.tv/helix/streams?user_login=un33d&user_login=magarky&user_login=pasdebol_tft&user_login=shaunz&user_login=mistermv&user_login=drfeelgood"
export const CLIENT_ID = ""
export const AUTH_BEARER = ""

/////////// MAIL  CREDS //////////
export const EMAIL_ADRESS = ""
export const EMAIL_PASSWORD = ""
export const EMAIL_SEND_TO = ""