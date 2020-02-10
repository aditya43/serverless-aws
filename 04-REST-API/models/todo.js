/**
 * @param sequelize Database connection
 * @param DataTypes Sequelize instance
 */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('todo', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        task: {
            type: DataTypes.STRING
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW'),
            allowNull: false,
            field: 'created_at'
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW'),
            allowNull: false,
            field: 'updated_at'
        },
        deleted_at: {
            type: DataTypes.DATE,
            field: 'deleted_at'
        }
    }, {
        underscored: true, // Sequelize by default expects column names to be camel case. Since we are using postgresql, column names cannot be camel case. Instead they are snake case.
        paranoid: true, // When anything is deleted from this table, it won't delete a row. Instead it will set 'deleted_at' key.
        underscoredAll: true,
        timestamps: true
    });
};
