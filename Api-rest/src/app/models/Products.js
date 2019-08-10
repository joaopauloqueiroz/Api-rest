module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Products', {
        name: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        value: DataTypes.FLOAT,
        type: DataTypes.STRING,
        description: DataTypes.STRING
    })
    return Product
}