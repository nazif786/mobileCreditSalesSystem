import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, unique, int, varchar, index, foreignKey, datetime, text, float, tinyint, timestamp } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const company = mysqlTable("company", {
	compId: int("comp_id").autoincrement().notNull(),
	compName: varchar("comp_name", { length: 45 }).notNull(),
	compMobile: varchar("comp_mobile", { length: 15 }).notNull(),
	compEmail: varchar("comp_email", { length: 45 }),
	compAddress: varchar("comp_address", { length: 255 }),
},
(table) => {
	return {
		companyCompId: primaryKey({ columns: [table.compId], name: "company_comp_id"}),
		emailUnique: unique("email_UNIQUE").on(table.compEmail),
		mobileUnique: unique("mobile_UNIQUE").on(table.compMobile),
	}
});

export const companyContacts = mysqlTable("company_contacts", {
	contId: int("cont_id").autoincrement().notNull(),
	compId: int("comp_id").references(() => company.compId),
	contName: varchar("cont_name", { length: 45 }).notNull(),
	contMobile: varchar("cont_mobile", { length: 15 }).notNull(),
	contEmail: varchar("cont_email", { length: 45 }),
},
(table) => {
	return {
		compId: index("comp_id").on(table.compId),
		companyContactsContId: primaryKey({ columns: [table.contId], name: "company_contacts_cont_id"}),
		emailUnique: unique("email_UNIQUE").on(table.contEmail),
		mobileUnique: unique("mobile_UNIQUE").on(table.contMobile),
	}
});

export const customerSales = mysqlTable("customer_sales", {
	saleId: int("sale_id").autoincrement().notNull(),
	custId: int("cust_id").references(() => customers.custId),
	compId: int("comp_id").references(() => company.compId),
	userId: int("user_id").references(() => users.userId),
	transTypeId: int("trans_type_id").references(() => transactionType.typeId),
	saleDate: datetime("sale_date", { mode: 'string'}),
	amount: int("amount").notNull(),
	payment: int("payment").notNull(),
	recieptNo: int("reciept_no").notNull(),
	remarks: text("remarks"),
	balance: float("balance"),
},
(table) => {
	return {
		custId: index("cust_id").on(table.custId),
		ibfk2Idx: index("customer_sales_ibfk_2_idx").on(table.compId),
		transTypeId: index("trans_type_id").on(table.transTypeId),
		userId: index("user_id").on(table.userId),
		customerSalesSaleId: primaryKey({ columns: [table.saleId], name: "customer_sales_sale_id"}),
	}
});

export const customers = mysqlTable("customers", {
	custId: int("cust_id").autoincrement().notNull(),
	custUId: varchar("cust_u_id", { length: 45 }).notNull(),
	custFname: varchar("cust_fname", { length: 45 }).notNull(),
	custLname: varchar("cust_lname", { length: 45 }).notNull(),
	custComi: varchar("cust_comi", { length: 45 }).notNull(),
	custMobile: varchar("cust_mobile", { length: 20 }).notNull(),
	custEmail: varchar("cust_email", { length: 45 }),
	custAddress: varchar("cust_address", { length: 255 }),
	custRegDate: datetime("cust_reg_date", { mode: 'string'}).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		customersCustId: primaryKey({ columns: [table.custId], name: "customers_cust_id"}),
		custUIdUnique: unique("cust_u_id_UNIQUE").on(table.custUId),
		emailUnique: unique("email_UNIQUE").on(table.custEmail),
		mobileUnique: unique("mobile_UNIQUE").on(table.custMobile),
	}
});

export const employees = mysqlTable("employees", {
	id: int("id").autoincrement().notNull(),
	tazkiraId: varchar("tazkira_id", { length: 15 }).notNull(),
	fname: varchar("fname", { length: 45 }).notNull(),
	lname: varchar("lname", { length: 45 }),
	fatherName: varchar("father_name", { length: 45 }),
	jobTitle: varchar("job_title", { length: 45 }).notNull(),
	mobile: varchar("mobile", { length: 15 }).notNull(),
	email: varchar("email", { length: 45 }),
	address: varchar("address", { length: 255 }),
	regDate: datetime("reg_date", { mode: 'string'}).default(sql`CURRENT_TIMESTAMP`).notNull(),
	status: tinyint("status").default(0),
},
(table) => {
	return {
		employeesId: primaryKey({ columns: [table.id], name: "employees_id"}),
		emailUnique: unique("email_UNIQUE").on(table.email),
		mobileUnique: unique("mobile_UNIQUE").on(table.mobile),
		tazkiraIdUnique: unique("tazkira_id_UNIQUE").on(table.tazkiraId),
	}
});

export const invoicePictures = mysqlTable("invoice_pictures", {
	picId: int("pic_id").autoincrement().notNull(),
	pId: int("p_id").references(() => purchases.pId),
	picDate: datetime("pic_date", { mode: 'string'}).default(sql`CURRENT_TIMESTAMP`),
	picInvoiceDate: datetime("pic_invoice_date", { mode: 'string'}).default(sql`CURRENT_TIMESTAMP`),
	picInvoiceNo: int("pic_invoice_no"),
	compId: int("comp_id").references(() => company.compId),
	picImage: text("pic_image"),
	remarks: text("remarks"),
},
(table) => {
	return {
		invoicePictureCompanyFkIdx: index("invoice_picture_company_fk_idx").on(table.compId),
		invoicePicturesPicId: primaryKey({ columns: [table.picId], name: "invoice_pictures_pic_id"}),
	}
});

export const purchasechanges = mysqlTable("purchasechanges", {
	pChangeId: int("p_change_id").autoincrement().notNull(),
	pId: int("p_id"),
	userId: int("user_id"),
	beforePAmount: int("before_p_amount"),
	afterPAmount: int("after_P_amount"),
	beforePPayment: int("before_p_payment"),
	afterPPayment: int("after_p_payment"),
	pRecieptNo: int("p_reciept_no"),
	changedAt: timestamp("changedAt", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => {
	return {
		purchasechangesPChangeId: primaryKey({ columns: [table.pChangeId], name: "purchasechanges_p_change_id"}),
	}
});

export const purchasedelete = mysqlTable("purchasedelete", {
	deleteId: int("delete_id").autoincrement().notNull(),
	pId: int("p_id"),
	compId: int("comp_id"),
	userId: int("user_id"),
	transTypeId: int("trans_type_id"),
	pAmount: int("p_amount"),
	pPayment: int("p_payment"),
	pRecieptNo: int("p_reciept_no"),
	pCom: int("p_com"),
	pDate: datetime("p_date", { mode: 'string'}),
	deletedAt: timestamp("deletedAt", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => {
	return {
		purchasedeleteDeleteId: primaryKey({ columns: [table.deleteId], name: "purchasedelete_delete_id"}),
	}
});

export const purchases = mysqlTable("purchases", {
	pId: int("p_id").autoincrement().notNull(),
	compId: int("comp_id").references(() => company.compId),
	userId: int("user_id").references(() => users.userId),
	transTypeId: int("trans_type_id").references(() => transactionType.typeId),
	pAmount: int("p_amount").notNull(),
	pPayment: int("p_payment").notNull(),
	pRecieptNo: int("p_reciept_no").notNull(),
	pCom: int("p_com").notNull(),
	pDate: datetime("p_date", { mode: 'string'}).default(sql`CURRENT_TIMESTAMP`).notNull(),
	remarks: text("remarks"),
},
(table) => {
	return {
		compId: index("comp_id").on(table.compId),
		transTypeId: index("trans_type_id").on(table.transTypeId),
		userId: index("user_id").on(table.userId),
		purchasesPId: primaryKey({ columns: [table.pId], name: "purchases_p_id"}),
		pRecieptNoUnique: unique("p_reciept_no_UNIQUE").on(table.pRecieptNo),
	}
});

export const saleschanges = mysqlTable("saleschanges", {
	changeId: int("change_id").autoincrement().notNull(),
	saleId: int("sale_id"),
	userId: int("user_id"),
	beforeAmount: int("before_amount"),
	afterAmount: int("after_amount"),
	beforePayment: int("before_payment"),
	afterPayment: int("after_payment"),
	changedAt: timestamp("changedAt", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => {
	return {
		saleschangesChangeId: primaryKey({ columns: [table.changeId], name: "saleschanges_change_id"}),
	}
});

export const salesdelete = mysqlTable("salesdelete", {
	saleDeleteId: int("sale_delete_id").autoincrement().notNull(),
	saleId: int("sale_id"),
	custId: int("cust_id"),
	compId: int("comp_id"),
	userId: int("user_id"),
	transTypeId: int("trans_type_id"),
	saleDate: datetime("sale_date", { mode: 'string'}),
	amount: int("amount"),
	payment: int("payment"),
	recieptNo: int("reciept_no"),
	deletedAt: timestamp("deletedAt", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => {
	return {
		salesdeleteSaleDeleteId: primaryKey({ columns: [table.saleDeleteId], name: "salesdelete_sale_delete_id"}),
	}
});

export const transactionType = mysqlTable("transaction_type", {
	typeId: int("type_id").autoincrement().notNull(),
	typeName: varchar("type_name", { length: 45 }).notNull(),
},
(table) => {
	return {
		transactionTypeTypeId: primaryKey({ columns: [table.typeId], name: "transaction_type_type_id"}),
		typeNameUnique: unique("type_name_UNIQUE").on(table.typeName),
	}
});

export const users = mysqlTable("users", {
	userId: int("user_id").autoincrement().notNull(),
	empId: int("emp_id").references(() => employees.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	userName: varchar("user_name", { length: 45 }).notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	isAdmin: tinyint("is_admin").default(0).notNull(),
	userRegDate: datetime("user_reg_date", { mode: 'string'}),
	lastLogin: datetime("last_login", { mode: 'string'}),
},
(table) => {
	return {
		usersUserId: primaryKey({ columns: [table.userId], name: "users_user_id"}),
		userNameUnique: unique("user_name_UNIQUE").on(table.userName),
	}
});