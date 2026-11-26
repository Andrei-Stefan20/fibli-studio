//! Portable application core for Fibli.
//!
//! Application and domain services must remain independent
//! of the desktop host and platform-specific APIs.

pub fn version() -> &'static str {
    env!("CARGO_PKG_VERSION")
}

#[cfg(test)]
mod tests {
    #[test]
    fn exposes_core_version() {
        assert_eq!(super::version(), env!("CARGO_PKG_VERSION"));
    }
}
