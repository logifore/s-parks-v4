"use strict";

window.SPARKS_CONFIG = {
  version: "sparks-v6.5.0",
  authStorageKey: "sparks-v6-5-session",
  localAuthFallbackEnabled: true,
  localAccounts: [
    {
      username: "yonghu",
      email: "yonghu@sparks.local",
      password: "123456",
      displayName: "普通用户",
      role: "user",
      creatorId: "",
      avatarUrl: ""
    },
    {
      username: "chuangzuo",
      email: "chuangzuo@sparks.local",
      password: "123456",
      displayName: "创作者",
      role: "creator",
      creatorId: "elena-voss",
      avatarUrl: ""
    },
    {
      username: "admin",
      email: "admin@sparks.local",
      password: "admin123456",
      displayName: "管理员",
      role: "admin",
      creatorId: "",
      avatarUrl: ""
    }
  ],
  supabaseUrl: "https://nyntzzycktnzghaffvzr.supabase.co",
  supabaseAnonKey: "sb_publishable_kn_S6ekzdaE_QVjaseSZ7A_gQAz1zRF"
};
