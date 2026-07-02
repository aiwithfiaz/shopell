# Database Design Skill

## Purpose
Guide the design and implementation of efficient, scalable database schemas for Shopell.com using PostgreSQL and Prisma.

## Rules
1. Follow normalization principles (3NF)
2. Use UUIDs for primary keys
3. Implement proper foreign key constraints
4. Use appropriate data types
5. Create indexes for frequent queries
6. Implement soft deletes where needed
7. Use timestamps for auditing

## Best Practices
- Design for scalability from the start
- Use proper naming conventions (snake_case)
- Implement cascade deletes appropriately
- Use JSONB for flexible data
- Create materialized views for complex queries
- Implement proper constraints
- Use database functions for business logic

## Implementation Guidelines
- Define schema in Prisma
- Use migrations for schema changes
- Implement Row Level Security
- Create proper indexes
- Use database triggers for automation
- Implement proper backup strategies
- Document schema relationships
