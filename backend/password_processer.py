import hashlib

def hash_password(password):
    encoded_password = password.encode('utf-8')
    return hashlib.sha256(encoded_password).hexdigest()


import re

def check_length(password):
    return len(password) >= 8

def check_uppercase(password):
    return bool(re.search(r'[A-Z]', password))

def check_lowercase(password):
    return bool(re.search(r'[a-z]', password))

def check_number(password):
    return bool(re.search(r'[0-9]', password))

def check_special_char(password):
    return bool(re.search(r'[!@#$%^&\-\_*]', password))

def check_common_passwords(password):
    common_passwords = ["987654321", "12345678", "123456789", "Aa123456", "12345678910",
                        "UNKNOWN", "admin123", "********", "P@ssw0rd", "Aa@123456"]
    return password not in common_passwords and "password" not in password.lower()

rules = {
        'length': {
            'func': check_length,
            'message': 'Password must be at least 8 characters long.'},
        'uppercase': {
            'func': check_uppercase,
            'message': 'Password must contain at least one uppercase letter.'},
        'lowercase': {
            'func': check_lowercase,
            'message': 'Password must contain at least one lowercase letter.'
        },
        'number': {
            'func': check_number,
            'message': 'Password must contain at least one number.'
        },
        'special_char': {
            'func': check_special_char,
            'message': 'Password must contain at least one special character (!@#$%^&-_*).'
        },
        'common_passwords': {
            'func': check_common_passwords,
            'message': 'Password must not be a common password.'
        }
    }

def check_valid(password):

    errors = []
    for rule in rules:
        if not rules[rule]['func'](password):
            errors.append(rules[rule]['message'])

    if len(errors) >= 1:
        return False, f"{errors[0]}"
    else:
        return True, "Password is valid"
    

# print(check_valid("847712_jkjG")[1])