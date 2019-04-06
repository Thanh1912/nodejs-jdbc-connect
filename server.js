
console.log('jinst');

var jinst = require('jdbc/lib/jinst');
var dm = require('jdbc/lib/drivermanager');
var Connection = require('jdbc/lib/connection');
var ResultSet = require('jdbc/lib/resultset');
var java = jinst.getInstance();


if (!jinst.isJvmCreated()) {
    jinst.addOption("-Xrs");
    jinst.setupClasspath([
        './drivers/protobuf-java-2.6.0.jar',
        './drivers/mysql-connector-java-8.0.11.jar',
        './drivers/mysql-connector-java-5.1.22-bin.jar']);
}

var config = {
    url: 'jdbc:mysql://localhost:3306/world',
    drivername: 'com.mysql.jdbc.Driver',
    user: 'root',
    password: '123456',
    minpoolsize: 2,
    maxpoolsize: 3
};

dm.getConnection(config.url, config.user, config.password, function (err, conn) {
    if (err) {
        console.log('ERROR CC', err);
    } else {
        testconn = new Connection(conn);
        testconn.createStatement(function (err, statement) {
            if (err) {
                console.log(err);
            } else {
                statement.executeQuery("SELECT * FROM world.city", function (err, resultset) {
                    resultset.toObjArray(function(err, results) {
                        console.log(results)
                    });
                });
            }
        });
    }
});
