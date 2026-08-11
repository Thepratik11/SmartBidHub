package com.bidbridge.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(sm ->
                sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(auth -> auth
                // A. ALWAYS FIRST: Allow all OPTIONS (CORS Preflight)
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // B. PUBLIC: Auth, Registration, and Swagger
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/buyers/register", "/api/vendors/register").permitAll()
                .requestMatchers(
                    "/v3/api-docs/**", "/v3/api-docs", "/swagger-ui/**", 
                    "/swagger-ui.html", "/webjars/**", "/v3/api-docs/swagger-config"
                ).permitAll()

                // C. CATEGORIES: Ensure any authenticated user (BUYER/VENDOR/ADMIN) can GET
                // We use hasAnyRole to be explicit and avoid any "authenticated-only" ambiguity
                .requestMatchers(HttpMethod.GET, "/api/categories/**").hasAnyRole("BUYER", "VENDOR", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/categories/admin/**").hasRole("ADMIN")

                // D. PROTECTED: Specific Roles
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/buyers/**").hasRole("BUYER")
                .requestMatchers("/api/vendors/**").hasRole("VENDOR")
                .requestMatchers("/api/bids/**").hasAnyRole("BUYER", "VENDOR")

                // E. SECURE: Fallback
                .anyRequest().authenticated()
            )
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }

//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowedOrigins(List.of("http://localhost:5173")); 
//        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        // Added 'Accept' and 'Origin' to allowed headers for better compatibility
//        config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Cache-Control", "X-Requested-With", "Accept", "Origin"));
//        config.setAllowCredentials(true);
//        config.setExposedHeaders(List.of("Authorization"));
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", config);
//        return source;
//    }
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowedOrigins(List.of("https://bidbridge.vercel.app")); 
//        
//        // !!! ADDED "PATCH" HERE !!!
//        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
//        
//        config.setAllowedHeaders(List.of(
//            "Authorization", 
//            "Content-Type", 
//            "Cache-Control", 
//            "X-Requested-With", 
//            "Accept", 
//            "Origin"
//        ));
//        config.setAllowCredentials(true);
//        config.setExposedHeaders(List.of("Authorization"));
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", config);
//        return source;
//    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOriginPatterns(List.of("https://*.vercel.app","http://localhost:5173"));
        config.setAllowedMethods(List.of("*"));
        config.setAllowedHeaders(List.of("*"));
        config.setExposedHeaders(List.of("Authorization"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}