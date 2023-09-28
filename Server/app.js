const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
var app = express();

var con = mysql.createConnection({
	user: "yero",
	database: "insert",
	password: "yero#123",
	host: "localhost",
});

con.connect((err) => {
	if (err) console.log(err.message);
	else console.log("Connected");
});

app.get("/createTable", (req, res) => {
	let createProducts = `CREATE TABLE if not exists Products(
        product_id int auto_increment,
        product_url varchar(255) not null,
        product_name varchar(255) not null,
        PRIMARY KEY (product_id)
    )`;
	let createProductDescription = `CREATE TABLE if not exists ProductDescription(
        description_id int auto_increment,
        product_id int(11) not null,
        product_brief_description TEXT not null,
        product_description TEXT not null,
        product_img varchar(255) not null,
        product_link varchar(255) not null,
        PRIMARY KEY (description_id),
        FOREIGN KEY (product_id) REFERENCES Products(product_id)
    )`;
	let createProductPrice = `CREATE TABLE if not exists ProductPrice(
        price_id int auto_increment,
        product_id int(11) not null,
        starting_price varchar(255) not null,
        price_range varchar(255) not null,
        PRIMARY KEY (price_id),
        FOREIGN KEY (product_id) REFERENCES Products(product_id)
    )`;

	con.query(createProducts, (err, result, field) => {
		if (err) console.log(err.message);
	});
	con.query(createProductDescription, (err, result, field) => {
		if (err) console.log(err.message);
	});
	con.query(createProductPrice, (err, result, field) => {
		if (err) console.log(err.message);
	});
	res.end("tables are created");
});

app.use(express.json());

app.use(
	express.urlencoded({
		extended: true,
	})
);

// const corsOP = {
// 	origin: ["http://localhost:5173/"],
// };

app.use(cors());

app.post("/addIphone", (req, res) => {
	let {
		iphoneId,
		imgPath,
		iphoneLink,
		iphoneTitle,
		briefDescription,
		StartPrice,
		priceRange,
		fullDescription,
	} = req.body;
	let sqlAddToProducts = `INSERT INTO Products (product_url, product_name) VALUES ("${iphoneId}", "${iphoneTitle}")`;
	con.query(sqlAddToProducts, (err, result) => {
		if (err) throw err;

		let productId = result.insertId;

		let sqlAddToProductDescription = `INSERT INTO ProductDescription (product_id, product_brief_description, product_description, product_img, product_link) VALUES ("${productId}","${briefDescription}", "${fullDescription}", "${imgPath}","${iphoneLink}" )`;

		let sqlAddToProductPrice = `INSERT INTO productprice (product_id, starting_price, price_range) VALUES("${productId}", "${StartPrice}","${priceRange}" )`;

		con.query(sqlAddToProductDescription, (err, result) => {
			if (err) throw err;
			console.log("Product description inserted");
		});

		con.query(sqlAddToProductPrice, (err, result) => {
			if (err) throw err;
			console.log("Product price inserted");
		});
	});

	res.end("data inserted successfully");
});

app.get("/iphone", (req, res) => {
	let retrieveAllTablesData =
		"SELECT  * FROM Products JOIN ProductDescription JOIN ProductPrice ON Products.product_id = ProductDescription.product_id AND Products.product_id = ProductPrice.product_id";
	con.query(retrieveAllTablesData, (err, results, fields) => {
		if (err) console.log("selectionerror", err);
		res.send(results);
	});
});

app.put("/updateIphone", (req, res) => {
	const {
		Id,
		imgPath,
		iphoneLink,
		iphoneTitle,
		briefDescription,
		StartPrice,
		priceRange,
		fullDescription,
	} = req.body;

	// Update the Products table
	const updateProduct = `UPDATE Products SET product_url = "${iphoneTitle}", product_name = "${iphoneTitle}" WHERE product_id = ${Id}`;
	con.query(updateProduct, (err, result) => {
		if (err) {
			console.log(err.message);
			return res.status(500).send("Error updating product");
		}

		// Update the ProductDescription table
		const updateProductDescription = `UPDATE ProductDescription SET product_brief_description = "${briefDescription}", product_description = "${fullDescription}", product_img = "${imgPath}", product_link = "${iphoneLink}" WHERE product_id = ${Id}`;
		con.query(updateProductDescription, (err, result) => {
			if (err) {
				console.log(err.message);
				return res.status(500).send("Error updating product description");
			}
			console.log("Product description updated");

			// Update the ProductPrice table
			const updateProductPrice = `UPDATE ProductPrice SET starting_price = "${StartPrice}", price_range = "${priceRange}" WHERE product_id = ${Id}`;
			con.query(updateProductPrice, (err, result) => {
				if (err) {
					console.log(err.message);
					return res.status(500).send("Error updating product price");
				}
				console.log("Product price updated");

				res.send("Product updated successfully");
			});
		});
	});
});

app.delete("/deleteIphone", (req, res) => {
	const { Id } = req.body;

	// Delete related entries from the ProductDescription table
	const deleteProductDescription = `DELETE FROM ProductDescription WHERE product_id = ${Id}`;
	con.query(deleteProductDescription, (err, result) => {
		if (err) {
			console.log(err.message);
			return res.status(500).send("Error deleting product description");
		}

		// Delete related entries from the ProductPrice table
		const deleteProductPrice = `DELETE FROM ProductPrice WHERE product_id = ${Id}`;
		con.query(deleteProductPrice, (err, result) => {
			if (err) {
				console.log(err.message);
				return res.status(500).send("Error deleting product price");
			}

			// Delete the product from the Products table
			const deleteProduct = `DELETE FROM Products WHERE product_id = ${Id}`;
			con.query(deleteProduct, (err, result) => {
				if (err) {
					console.log(err.message);
					return res.status(500).send("Error deleting product");
				}

				console.log("Product and related data deleted successfully");

				res.send("Product and related data deleted successfully");
			});
		});
	});
});

app.listen(3001, () => console.log("Listening to : 3001"));
