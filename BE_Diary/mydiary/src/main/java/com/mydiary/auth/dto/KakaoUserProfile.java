package com.mydiary.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KakaoUserProfile {
    private Long id;
    private String connected_at;
    private Properties properties;
    private KakaoAccount kakao_account;


    @Getter
    @Setter
    public static class Properties {
        private String nickname;
    }

    @Getter
    @Setter
    public static class KakaoAccount {
        private Boolean profile_nickname_needs_agreement;
        private Profile profile;

        @Getter
        @Setter
        public static class Profile {
            private String nickname;
            private Boolean is_default_nickname;

        }
    }
}