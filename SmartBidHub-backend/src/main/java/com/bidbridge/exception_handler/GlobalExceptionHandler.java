package com.bidbridge.exception_handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.bidbridge.custom_exceptions.BadRequestException;
import com.bidbridge.custom_exceptions.DuplicateResourceException;
import com.bidbridge.custom_exceptions.InvalidOperationException;
import com.bidbridge.custom_exceptions.ResourceNotFoundException;
import com.bidbridge.dto.ApiErrorResponse;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ---------------------------
    // RESOURCE NOT FOUND (404)
    // ---------------------------
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleResourceNotFound(
            ResourceNotFoundException ex
    ) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }
    
    // ---------------------------
    // DUPLICATE RESOURCE (409)
    // ---------------------------
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ApiErrorResponse> handleDuplicateResource(
            DuplicateResourceException ex
    ) {
        return buildResponse(HttpStatus.CONFLICT, ex.getMessage());
    }

    // ---------------------------
    // INVALID OPERATION (400)
    // ---------------------------
    @ExceptionHandler(InvalidOperationException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidOperation(
            InvalidOperationException ex
    ) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }
    
    // ---------------------------
    // BAD REQUEST (400)
    // ---------------------------
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiErrorResponse> handleBadRequest(
            BadRequestException ex
    ) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }
    
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiErrorResponse> handleAuthenticationException(
            AuthenticationException ex
    ) {
        return buildResponse(
                HttpStatus.UNAUTHORIZED,
                "Authentication required or invalid token"
        );
    }
    
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiErrorResponse> handleAccessDeniedException(
            AccessDeniedException ex
    ) {
        return buildResponse(
                HttpStatus.FORBIDDEN,
                "You are not allowed to access this resource"
        );
    }

    // ---------------------------
    // @Valid VALIDATION ERRORS (400)
    // ---------------------------
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidationErrors(
            MethodArgumentNotValidException ex
    ) {
    	
    	String errorMessage = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .collect(Collectors.joining(", "));

        return buildResponse(HttpStatus.BAD_REQUEST, errorMessage);
    }

    // ---------------------------
    // FALLBACK (500)
    // ---------------------------
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleGenericException(
            Exception ex
    ) {
        return buildResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Internal server error"
        );
    }
    
 // ---------------------------
    // COMMON BUILDER
    // ---------------------------
    private ResponseEntity<ApiErrorResponse> buildResponse(
            HttpStatus status,
            String message
    ) {
        ApiErrorResponse response = new ApiErrorResponse(
                LocalDateTime.now(),
                status.value(),
                message
        );
        return new ResponseEntity<>(response, status);
    }
}
    
