Solving the 2 people booking the same problem:
- Solved using indexes
-  indexes: Database indexes, which are crucial performance optimization tools in database management systems. Database indexes are data structures that improve the speed of data retrieval operations on database tables at the cost of additional storage space and slower write operations.
-  using indexes we create db level constraint that userId,seatId,flightId altogether must be unique and bind it in transaction. Thus the duplicate booking will through error and only one get committed.
 - In migration add pass one more object indexes:[{unique:true,fields: ['userId','seatId','flightId']}]