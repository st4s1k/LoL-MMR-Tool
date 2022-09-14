declare module 'OPGGMatchInfo' {
  export interface QueueInfo {
    id: number;
    queue_translate: string;
    game_type: string;
  }

  export interface AverageTierInfo {
    tier: string;
    division: number;
    tier_image_url: string;
    border_image_url: string;
  }

  export interface Summoner {
    id: number;
    summoner_id: string;
    acct_id: string;
    puuid: string;
    name: string;
    internal_name: string;
    profile_image_url: string;
    level: number;
    updated_at: Date;
  }

  export interface Rune {
    primary_page_id: number;
    primary_rune_id: number;
    secondary_page_id: number;
  }

  export interface Stats {
    champion_level: number;
    damage_self_mitigated: number;
    damage_dealt_to_objectives: number;
    damage_dealt_to_turrets: number;
    magic_damage_dealt_player: number;
    physical_damage_taken: number;
    physical_damage_dealt_to_champions: number;
    total_damage_taken: number;
    total_damage_dealt: number;
    total_damage_dealt_to_champions: number;
    largest_critical_strike: number;
    time_ccing_others: number;
    vision_score: number;
    vision_wards_bought_in_game: number;
    sight_wards_bought_in_game: number;
    ward_kill: number;
    ward_place: number;
    turret_kill: number;
    barrack_kill: number;
    kill: number;
    death: number;
    assist: number;
    largest_multi_kill: number;
    largest_killing_spree: number;
    minion_kill: number;
    neutral_minion_kill_team_jungle: number;
    neutral_minion_kill_enemy_jungle: number;
    neutral_minion_kill: number;
    gold_earned: number;
    total_heal: number;
    result: string;
    op_score: number;
    op_score_rank: number;
    is_opscore_max_in_team: boolean;
  }

  export interface TierInfo {
    tier: string;
    division: number;
    lp: number;
    tier_image_url: string;
    border_image_url: string;
  }

  export interface Participant {
    summoner: Summoner;
    participant_id: number;
    champion_id: number;
    team_key: string;
    position: string;
    items: number[];
    trinket_item: number;
    rune: Rune;
    spells: number[];
    stats: Stats;
    tier_info: TierInfo;
  }

  export interface GameStat {
    dragon_kill: number;
    baron_kill: number;
    tower_kill: number;
    is_win: boolean;
    is_remake: boolean;
    kill: number;
    death: number;
    assist: number;
    gold_earned: number;
  }

  export interface Team {
    key: string;
    game_stat: GameStat;
  }

  export interface Summoner2 {
    id: number;
    summoner_id: string;
    acct_id: string;
    puuid: string;
    name: string;
    internal_name: string;
    profile_image_url: string;
    level: number;
    updated_at: Date;
  }

  export interface TierInfo2 {
    tier: string;
    division: number;
    lp: number;
    tier_image_url: string;
    border_image_url: string;
  }

  export interface MyData {
    summoner: Summoner2;
    participant_id: number;
    team_key: string;
    position: string;
    tier_info: TierInfo2;
  }

  export interface Game {
    id: string;
    created_at: Date;
    game_map: string;
    queue_info: QueueInfo;
    version: string;
    game_length_second: number;
    is_remake: boolean;
    is_opscore_active: boolean;
    is_recorded: boolean;
    average_tier_info: AverageTierInfo;
    participants: Participant[];
    teams: Team[];
    myData: MyData;
  }

  export interface Error {
    message: string;
    status: number;
    url: string;
  }

  export interface PageProps {
    region: string;
    game: Game;
    error: Error;
  }

  export interface Props {
    pageProps: PageProps;
  }

  export interface Query {
    region: string;
    summoner: string;
    gameId: string;
    createdAt: string;
  }

  export interface OPGGMatchInfo {
    props?: Props;
    page?: string;
    query?: Query;
  }
}
