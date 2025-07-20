# Database Transactions: Concepts & Best Practices

A **database transaction** is a sequence of operations performed as a single unit of work. These operations often include various CRUD actions. Transactions ensure that either all steps are completed successfully, or none are applied—preventing intermediate, inconsistent states.

---

## Why Transactions Matter

During a transaction, the database can temporarily enter inconsistent states. To avoid issues, databases implement the **ACID** properties:

| Property    | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| **A**tomicity   | All steps succeed or none do. No partial completion.                      |
| **C**onsistency | Data remains valid and in a consistent state throughout.                  |
| **I**solation   | Multiple transactions execute without interfering with each other.         |
| **D**urability  | Once committed, changes persist even after failures.                      |

**Atomicity States:**
- **Begin:** Transaction starts.
- **Commit:** All changes applied successfully.
- **Rollback:** On error, all changes are reverted.

---

## Transaction Anomalies

- **Read-Write (R-W) Conflict**
- **Write-Read (W-R) Conflict**
- **Write-Write (W-W) Conflict**

---

## Isolation Levels

Isolation levels define how much a transaction is affected by others running concurrently. Each level balances consistency and performance:

| Level                | Description                                                                 | Problems/Examples                                                                 |
|----------------------|-----------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Read Uncommitted** | Transactions can read uncommitted changes from others.                      | Dirty reads, non-repeatable reads, phantom reads.<br>_E.g.: Seeing a seat as "booked" before commit._ |
| **Read Committed**   | Only committed data is visible to other transactions.                       | Prevents dirty reads, but allows non-repeatable/phantom reads.<br>_E.g.: Flight price changes between reads._ |
| **Repeatable Read**  | Multiple reads within a transaction return the same result.                 | Prevents dirty/non-repeatable reads, allows phantom reads.<br>_E.g.: Consistent seat counts, but new bookings may appear._ |
| **Serializable**     | Transactions run as if executed one after another.                          | No concurrency issues, but performance drops.<br>_E.g.: Only one booking at a time._ |

---

## Locking Strategies

### Database-Level Locking

1. **Pessimistic Locking**
    - Locks data when read (`SELECT ... FOR UPDATE`)
    - Good for high-contention (e.g., booking last seat)
    - Can cause deadlocks, reduces concurrency

2. **Optimistic Locking**
    - Uses version numbers/timestamps to detect conflicts
    - Allows concurrent reads, checks for changes before commit
    - Requires retry logic on conflict

3. **Row-Level Locking**
    - Locks specific rows, not entire tables
    - Supported by most databases
    - Balances concurrency and integrity

4. **Table-Level Locking**
    - Locks entire tables (rarely used)
    - Only for critical operations needing full consistency

### Application-Level Locking

5. **Mutex/Semaphores**
    - In-memory locks within a single app instance
    - Not suitable for distributed systems

6. **Distributed Locking**
    - Uses external systems (e.g., Redis, DB) for coordination
    - Essential for microservices
    - _E.g.: Redis `SETNX` for distributed locks_

7. **Queue-Based Serialization**
    - Serialize critical operations via message queues (e.g., RabbitMQ)
    - Processes bookings sequentially, preventing race conditions

---

> **Tip:** Choose isolation and locking strategies based on your application's consistency needs and expected concurrency.

