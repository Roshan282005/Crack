import hashlib
import os
import time
from typing import List, Tuple

# ---- Hashing utilities ----
def make_hash(password: str, salt: bytes = None, iterations: int = 100_000) -> Tuple[bytes, bytes, int]:
    if salt is None:
        salt = os.urandom(16)
    dk = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iterations)
    return salt, dk, iterations

def verify_hash(password: str, salt: bytes, dk: bytes, iterations: int) -> bool:
    test = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iterations)
    return test == dk

# ---- Lock object ----
class LockSimulator:
    def __init__(self, lock_type: str):
        assert lock_type in ("pin", "password", "pattern"), "lock_type must be 'pin', 'password', or 'pattern'"
        self.lock_type = lock_type
        self.salt = None
        self.dk = None
        self.iterations = None
        self.secret_raw = None  # only for lab use (do NOT expose in real systems)

    def set_secret(self, secret: str):
        """Set and hash the secret for the lock."""
        self.secret_raw = secret
        self.salt, self.dk, self.iterations = make_hash(secret)

    def attempt(self, guess: str) -> bool:
        if self.dk is None:
            raise RuntimeError("Secret not set")
        return verify_hash(guess, self.salt, self.dk, self.iterations)

# ---- Attack method for password ----
def dictionary_attack_password(lock: LockSimulator, wordlist: List[str]):
    """Try a list of candidate passwords. Returns on first success."""
    assert lock.lock_type == "password"
    start = time.time()
    for w in wordlist:
        if lock.attempt(w):
            return True, w, time.time() - start
    return False, None, time.time() - start

# ---- Example usage for password ----
if __name__ == "__main__":
    pwd_lock = LockSimulator("password")
    pwd_lock.set_secret("S3cr3t!")  # lab only
    wordlist = ["123456", "password", "letmein", "S3cr3t!", "admin"]
    print("Testing password dictionary attack...")
    ok, found, elapsed = dictionary_attack_password(pwd_lock, wordlist)
    print(f"Found: {ok}, guess: {found}, time: {elapsed:.2f}s")
