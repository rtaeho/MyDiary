package com.mydiary.auth.dto;

public class KakaoUserProfile {
    private Long id;
    private String connected_at;
    private Properties properties;
    private KakaoAccount kakao_account;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getConnected_at() {
        return connected_at;
    }

    public void setConnected_at(String connected_at) {
        this.connected_at = connected_at;
    }

    public Properties getProperties() {
        return properties;
    }

    public void setProperties(Properties properties) {
        this.properties = properties;
    }

    public KakaoAccount getKakao_account() {
        return kakao_account;
    }

    public void setKakao_account(KakaoAccount kakao_account) {
        this.kakao_account = kakao_account;
    }

    public static class Properties {
        private String nickname;

        public String getNickname() {
            return nickname;
        }

        public void setNickname(String nickname) {
            this.nickname = nickname;
        }
    }

    public static class KakaoAccount {
        private Boolean profile_nickname_needs_agreement;
        private Profile profile;

        public Boolean getProfile_nickname_needs_agreement() {
            return profile_nickname_needs_agreement;
        }

        public void setProfile_nickname_needs_agreement(Boolean profile_nickname_needs_agreement) {
            this.profile_nickname_needs_agreement = profile_nickname_needs_agreement;
        }

        public Profile getProfile() {
            return profile;
        }

        public void setProfile(Profile profile) {
            this.profile = profile;
        }

        public static class Profile {
            private String nickname;
            private Boolean is_default_nickname;

            public String getNickname() {
                return nickname;
            }

            public void setNickname(String nickname) {
                this.nickname = nickname;
            }

            public Boolean getIs_default_nickname() {
                return is_default_nickname;
            }

            public void setIs_default_nickname(Boolean is_default_nickname) {
                this.is_default_nickname = is_default_nickname;
            }
        }
    }
}