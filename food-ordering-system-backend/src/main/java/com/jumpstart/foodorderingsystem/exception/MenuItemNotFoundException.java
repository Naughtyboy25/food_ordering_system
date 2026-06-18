package com.jumpstart.foodorderingsystem.exception;

/**
 * MenuItemNotFoundException is thrown when a requested menu item does not exist.
 */
public class MenuItemNotFoundException extends RuntimeException {

    public MenuItemNotFoundException(String message) {
        super(message);
    }
}
