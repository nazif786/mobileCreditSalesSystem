-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `company` (
	`comp_id` int AUTO_INCREMENT NOT NULL,
	`comp_name` varchar(45) NOT NULL,
	`comp_mobile` varchar(15) NOT NULL,
	`comp_email` varchar(45),
	`comp_address` varchar(255),
	CONSTRAINT `company_comp_id` PRIMARY KEY(`comp_id`),
	CONSTRAINT `mobile_UNIQUE` UNIQUE(`comp_mobile`),
	CONSTRAINT `email_UNIQUE` UNIQUE(`comp_email`)
);
--> statement-breakpoint
CREATE TABLE `company_contacts` (
	`cont_id` int AUTO_INCREMENT NOT NULL,
	`comp_id` int,
	`cont_name` varchar(45) NOT NULL,
	`cont_mobile` varchar(15) NOT NULL,
	`cont_email` varchar(45),
	CONSTRAINT `company_contacts_cont_id` PRIMARY KEY(`cont_id`),
	CONSTRAINT `mobile_UNIQUE` UNIQUE(`cont_mobile`),
	CONSTRAINT `email_UNIQUE` UNIQUE(`cont_email`)
);
--> statement-breakpoint
CREATE TABLE `customer_sales` (
	`sale_id` int AUTO_INCREMENT NOT NULL,
	`cust_id` int,
	`comp_id` int,
	`user_id` int,
	`trans_type_id` int,
	`sale_date` datetime,
	`amount` int NOT NULL,
	`payment` int NOT NULL,
	`reciept_no` int NOT NULL,
	`remarks` text,
	`balance` float,
	CONSTRAINT `customer_sales_sale_id` PRIMARY KEY(`sale_id`)
);
--> statement-breakpoint
CREATE TABLE `customers` (
	`cust_id` int AUTO_INCREMENT NOT NULL,
	`cust_u_id` varchar(45) NOT NULL,
	`cust_fname` varchar(45) NOT NULL,
	`cust_lname` varchar(45) NOT NULL,
	`cust_comi` varchar(45) NOT NULL,
	`cust_mobile` varchar(20) NOT NULL,
	`cust_email` varchar(45),
	`cust_address` varchar(255),
	`cust_reg_date` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `customers_cust_id` PRIMARY KEY(`cust_id`),
	CONSTRAINT `mobile_UNIQUE` UNIQUE(`cust_mobile`),
	CONSTRAINT `cust_u_id_UNIQUE` UNIQUE(`cust_u_id`),
	CONSTRAINT `email_UNIQUE` UNIQUE(`cust_email`)
);
--> statement-breakpoint
CREATE TABLE `employees` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tazkira_id` varchar(15) NOT NULL,
	`fname` varchar(45) NOT NULL,
	`lname` varchar(45),
	`father_name` varchar(45),
	`mobile` varchar(15) NOT NULL,
	`email` varchar(45),
	`address` varchar(255),
	`reg_date` date,
	`status` tinyint,
	CONSTRAINT `employees_id` PRIMARY KEY(`id`),
	CONSTRAINT `mobile_UNIQUE` UNIQUE(`mobile`),
	CONSTRAINT `tazkira_id_UNIQUE` UNIQUE(`tazkira_id`),
	CONSTRAINT `email_UNIQUE` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `invoice_pictures` (
	`pic_id` int AUTO_INCREMENT NOT NULL,
	`p_id` int,
	`pic_date` datetime DEFAULT CURRENT_TIMESTAMP,
	`pic_invoice_date` datetime DEFAULT CURRENT_TIMESTAMP,
	`pic_invoice_no` int,
	`comp_id` int,
	`pic_image` text,
	`remarks` text,
	CONSTRAINT `invoice_pictures_pic_id` PRIMARY KEY(`pic_id`)
);
--> statement-breakpoint
CREATE TABLE `purchasechanges` (
	`p_change_id` int AUTO_INCREMENT NOT NULL,
	`p_id` int,
	`user_id` int,
	`before_p_amount` int,
	`after_P_amount` int,
	`before_p_payment` int,
	`after_p_payment` int,
	`p_reciept_no` int,
	`changedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `purchasechanges_p_change_id` PRIMARY KEY(`p_change_id`)
);
--> statement-breakpoint
CREATE TABLE `purchasedelete` (
	`delete_id` int AUTO_INCREMENT NOT NULL,
	`p_id` int,
	`comp_id` int,
	`user_id` int,
	`trans_type_id` int,
	`p_amount` int,
	`p_payment` int,
	`p_reciept_no` int,
	`p_com` int,
	`p_date` datetime,
	`deletedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `purchasedelete_delete_id` PRIMARY KEY(`delete_id`)
);
--> statement-breakpoint
CREATE TABLE `purchases` (
	`p_id` int AUTO_INCREMENT NOT NULL,
	`comp_id` int,
	`user_id` int,
	`trans_type_id` int,
	`p_amount` int NOT NULL,
	`p_payment` int NOT NULL,
	`p_reciept_no` int NOT NULL,
	`p_com` int NOT NULL,
	`p_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`remarks` text,
	CONSTRAINT `purchases_p_id` PRIMARY KEY(`p_id`),
	CONSTRAINT `p_reciept_no_UNIQUE` UNIQUE(`p_reciept_no`)
);
--> statement-breakpoint
CREATE TABLE `saleschanges` (
	`change_id` int AUTO_INCREMENT NOT NULL,
	`sale_id` int,
	`user_id` int,
	`before_amount` int,
	`after_amount` int,
	`before_payment` int,
	`after_payment` int,
	`changedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `saleschanges_change_id` PRIMARY KEY(`change_id`)
);
--> statement-breakpoint
CREATE TABLE `salesdelete` (
	`sale_delete_id` int AUTO_INCREMENT NOT NULL,
	`sale_id` int,
	`cust_id` int,
	`comp_id` int,
	`user_id` int,
	`trans_type_id` int,
	`sale_date` datetime,
	`amount` int,
	`payment` int,
	`reciept_no` int,
	`deletedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `salesdelete_sale_delete_id` PRIMARY KEY(`sale_delete_id`)
);
--> statement-breakpoint
CREATE TABLE `transaction_type` (
	`type_id` int AUTO_INCREMENT NOT NULL,
	`type_name` varchar(45) NOT NULL,
	CONSTRAINT `transaction_type_type_id` PRIMARY KEY(`type_id`),
	CONSTRAINT `type_name_UNIQUE` UNIQUE(`type_name`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` int AUTO_INCREMENT NOT NULL,
	`emp_id` int,
	`user_name` varchar(45) NOT NULL,
	`password` varchar(255) NOT NULL,
	`is_admin` tinyint NOT NULL DEFAULT 0,
	`user_reg_date` datetime,
	`last_login` datetime,
	CONSTRAINT `users_user_id` PRIMARY KEY(`user_id`),
	CONSTRAINT `user_name_UNIQUE` UNIQUE(`user_name`)
);
--> statement-breakpoint
CREATE INDEX `comp_id` ON `company_contacts` (`comp_id`);--> statement-breakpoint
CREATE INDEX `cust_id` ON `customer_sales` (`cust_id`);--> statement-breakpoint
CREATE INDEX `user_id` ON `customer_sales` (`user_id`);--> statement-breakpoint
CREATE INDEX `trans_type_id` ON `customer_sales` (`trans_type_id`);--> statement-breakpoint
CREATE INDEX `customer_sales_ibfk_2_idx` ON `customer_sales` (`comp_id`);--> statement-breakpoint
CREATE INDEX `invoice_picture_company_fk_idx` ON `invoice_pictures` (`comp_id`);--> statement-breakpoint
CREATE INDEX `comp_id` ON `purchases` (`comp_id`);--> statement-breakpoint
CREATE INDEX `user_id` ON `purchases` (`user_id`);--> statement-breakpoint
CREATE INDEX `trans_type_id` ON `purchases` (`trans_type_id`);--> statement-breakpoint
ALTER TABLE `company_contacts` ADD CONSTRAINT `company_contacts_ibfk_1` FOREIGN KEY (`comp_id`) REFERENCES `company`(`comp_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `customer_sales` ADD CONSTRAINT `customer_sales_ibfk_1` FOREIGN KEY (`cust_id`) REFERENCES `customers`(`cust_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `customer_sales` ADD CONSTRAINT `customer_sales_ibfk_2` FOREIGN KEY (`comp_id`) REFERENCES `company`(`comp_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `customer_sales` ADD CONSTRAINT `customer_sales_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `customer_sales` ADD CONSTRAINT `customer_sales_ibfk_4` FOREIGN KEY (`trans_type_id`) REFERENCES `transaction_type`(`type_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `invoice_pictures` ADD CONSTRAINT `invoice_pictures_purchase` FOREIGN KEY (`p_id`) REFERENCES `purchases`(`p_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `invoice_pictures` ADD CONSTRAINT `invoice_picture_company_fk` FOREIGN KEY (`comp_id`) REFERENCES `company`(`comp_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purchases` ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`comp_id`) REFERENCES `company`(`comp_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purchases` ADD CONSTRAINT `purchases_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purchases` ADD CONSTRAINT `purchases_ibfk_4` FOREIGN KEY (`trans_type_id`) REFERENCES `transaction_type`(`type_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `FK_users_employees` FOREIGN KEY (`emp_id`) REFERENCES `employees`(`id`) ON DELETE restrict ON UPDATE cascade;
*/