# Enej Licina

## Implementation Summary

## Issue faced during the implementation

## Marvel API Unavailability
- The initial plan was to use the Marvel API for comic data
- The entire Marvel developer portal was down during development
- This prevented:
  - Creating a private key required for API calls
  - Accessing API documentation
  - Understanding endpoint structure and response formats

## Alternative Solution
- Switched to Superhero API (superheroapi.com) as an alternative data source
- This change affected the content of the grid cards, making them different from the original design
- Required adapting the application to work with a completely different data structure

### Other Implementation Challenges

### API-Related Issues
- Finding a suitable replacement API with sufficient data and reliability
- Working without proper documentation for the alternative API
- Designing interfaces that could accommodate the new data structure

### Technical Challenges
- Preventing duplicate items from loading at application startup
  - This issue only occurrs during initial app loading and not during subsequent data fetches
  - Required implementing a UUID-based tracking system to ensure uniqueness
