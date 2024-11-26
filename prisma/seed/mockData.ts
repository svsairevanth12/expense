import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('a4bf9319-5fe2-40a3-8cb4-e1795974cf1f', '1Mikel_Mann@hotmail.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=3', 'abc123def456', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('b04610da-ca85-46fe-b72f-3d3458afc4f9', '17Wyatt_Stoltenberg16@yahoo.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=19', 'abc123def456', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('6197ab9f-9165-48a0-89f5-e897735d0dba', '25Delphia33@yahoo.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=27', 'mno345pqr678', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('61c0b1ab-82cc-4aad-88ba-3254f17b7797', '33Judd74@hotmail.com', 'Emily Jones', 'https://i.imgur.com/YfJQV5z.png?id=35', 'abc123def456', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('db2e4551-3e0b-41de-8db5-f0838648bf98', '41Karianne81@hotmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=43', 'abc123def456', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('a1284d66-0014-4938-9e4d-4a32f6b9b98e', '49Mona48@gmail.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=51', 'mno345pqr678', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('3485bf1d-eba7-4651-b8cc-a58ebcafa608', '57Ignatius.McClure67@hotmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=59', 'ghi789jkl012', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('8183265a-5550-490c-8973-e46a5998af22', '65Marielle50@yahoo.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=67', 'stu901vwx234', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('a5488b8e-a7c9-45ae-ba5b-4bdaab23a65f', '73Ismael_Botsford39@gmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=75', 'mno345pqr678', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('aa444bfb-1028-4ebb-be60-6086ad9a2b32', 'SpendSmart Co.', 'https://i.imgur.com/YfJQV5z.png?id=82');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('45ebb5ea-e308-4f32-b85e-f0b473872148', 'SpendSmart Co.', 'https://i.imgur.com/YfJQV5z.png?id=85');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('1a34865a-2bfb-45a2-bf27-61be462b09f2', 'PennySaver Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=88');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('4284fd7a-8c4e-4a74-9512-5ec31fa6565a', 'ExpenseMaster Inc.', 'https://i.imgur.com/YfJQV5z.png?id=91');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('c85bead8-927d-4db0-925c-422d17ef62b9', 'SpendSmart Co.', 'https://i.imgur.com/YfJQV5z.png?id=94');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('9c84b352-f7cb-461c-b76d-35421b7e6562', 'ExpenseMaster Inc.', 'https://i.imgur.com/YfJQV5z.png?id=97');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('e806c9bf-0de4-40fe-a1db-e2248b7f2ac6', 'PennySaver Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=100');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('30aa947f-928c-45fe-9bd7-404ee4ee2ac7', 'BudgetWise Group', 'https://i.imgur.com/YfJQV5z.png?id=103');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('73f14f1a-0ace-4c2d-a452-bc45d2c25fa1', 'FinTrack Solutions', 'https://i.imgur.com/YfJQV5z.png?id=106');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('595f22e5-8dc5-47b0-a0f2-827862ed1da5', 'PennySaver Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=109');

INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('413e2949-4d9b-406a-86b2-5ac29e319947', 'Project Manager', 'db2e4551-3e0b-41de-8db5-f0838648bf98', '4284fd7a-8c4e-4a74-9512-5ec31fa6565a');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('20dcfbd6-cf47-4c1e-9be1-7e55092ca495', 'Administrator', 'a4bf9319-5fe2-40a3-8cb4-e1795974cf1f', 'aa444bfb-1028-4ebb-be60-6086ad9a2b32');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('a349930b-27ba-4ba2-b634-64de1a706d45', 'Financial Analyst', '8183265a-5550-490c-8973-e46a5998af22', '45ebb5ea-e308-4f32-b85e-f0b473872148');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('4df612c4-6d82-4044-9a6b-913bc6ab647b', 'Expense Coordinator', 'a4bf9319-5fe2-40a3-8cb4-e1795974cf1f', 'e806c9bf-0de4-40fe-a1db-e2248b7f2ac6');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('433f2f15-b7de-4462-8586-019c8a1d748e', 'Administrator', 'a4bf9319-5fe2-40a3-8cb4-e1795974cf1f', '73f14f1a-0ace-4c2d-a452-bc45d2c25fa1');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('0085f432-d24c-4b44-875b-5fbd5ba8caa1', 'Project Manager', '3485bf1d-eba7-4651-b8cc-a58ebcafa608', '45ebb5ea-e308-4f32-b85e-f0b473872148');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('5d3c2b8f-e4f4-434a-a701-39289100307d', 'Financial Analyst', 'a1284d66-0014-4938-9e4d-4a32f6b9b98e', '73f14f1a-0ace-4c2d-a452-bc45d2c25fa1');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('f2d57fa6-d13e-47ec-bd0c-81e9dc0420d5', 'Financial Analyst', '3485bf1d-eba7-4651-b8cc-a58ebcafa608', '9c84b352-f7cb-461c-b76d-35421b7e6562');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('e26ed633-5268-406d-9e11-67bb965af503', 'Administrator', 'b04610da-ca85-46fe-b72f-3d3458afc4f9', 'c85bead8-927d-4db0-925c-422d17ef62b9');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('448eea37-aee2-4299-b2d4-d8d7c02c83d7', 'Budget Specialist', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '4284fd7a-8c4e-4a74-9512-5ec31fa6565a');

INSERT INTO "Category" ("id", "name", "budgetLimit", "type", "organizationId") VALUES ('0f2ba6c3-43f3-4a5b-a1e1-8de2572ff815', 'Utilities', '300', 'Discretionary', '9c84b352-f7cb-461c-b76d-35421b7e6562');
INSERT INTO "Category" ("id", "name", "budgetLimit", "type", "organizationId") VALUES ('70ac4c49-542f-4ebc-8284-7bb3f7639641', 'Groceries', '500', 'Variable', '30aa947f-928c-45fe-9bd7-404ee4ee2ac7');
INSERT INTO "Category" ("id", "name", "budgetLimit", "type", "organizationId") VALUES ('b7a5f9cd-39dc-4bfd-84b4-fbbfcc6e7cc6', 'Groceries', '300', 'Essential', '9c84b352-f7cb-461c-b76d-35421b7e6562');
INSERT INTO "Category" ("id", "name", "budgetLimit", "type", "organizationId") VALUES ('8d8268bf-e5dc-4ac4-bd54-35f7a03d2df3', 'Healthcare', '500', 'Essential', 'aa444bfb-1028-4ebb-be60-6086ad9a2b32');
INSERT INTO "Category" ("id", "name", "budgetLimit", "type", "organizationId") VALUES ('c92db753-f5ae-41ba-97fb-d09537e608cb', 'Utilities', '500', 'Fixed', 'aa444bfb-1028-4ebb-be60-6086ad9a2b32');
INSERT INTO "Category" ("id", "name", "budgetLimit", "type", "organizationId") VALUES ('1ece0ea1-0b27-41bc-aa36-995f4a6155ed', 'Healthcare', '150', 'Discretionary', '4284fd7a-8c4e-4a74-9512-5ec31fa6565a');
INSERT INTO "Category" ("id", "name", "budgetLimit", "type", "organizationId") VALUES ('a55b8507-7db1-4561-891f-333cecd9d58d', 'Utilities', '400', 'Essential', 'aa444bfb-1028-4ebb-be60-6086ad9a2b32');
INSERT INTO "Category" ("id", "name", "budgetLimit", "type", "organizationId") VALUES ('9af95250-0ac1-453e-b43e-cb708ad8c10c', 'Utilities', '500', 'Luxury', '73f14f1a-0ace-4c2d-a452-bc45d2c25fa1');
INSERT INTO "Category" ("id", "name", "budgetLimit", "type", "organizationId") VALUES ('a3f10c64-5d13-488d-b161-f11ccb23910f', 'Transportation', '500', 'Luxury', '9c84b352-f7cb-461c-b76d-35421b7e6562');
INSERT INTO "Category" ("id", "name", "budgetLimit", "type", "organizationId") VALUES ('a3b028ff-449f-4f9c-8a85-80ed54641d91', 'Utilities', '200', 'Discretionary', 'aa444bfb-1028-4ebb-be60-6086ad9a2b32');

INSERT INTO "Project" ("id", "name", "description", "status", "organizationId") VALUES ('fb62bcf2-3a6e-435e-abfa-a780613f1e34', 'Website Redesign', 'Launching the new product line in the upcoming quarter.', 'Cancelled', '45ebb5ea-e308-4f32-b85e-f0b473872148');
INSERT INTO "Project" ("id", "name", "description", "status", "organizationId") VALUES ('e3e25edb-e782-4c7d-9b44-6d1855fc6d11', 'Marketing Campaign', 'Revamping the company website for better user experience.', 'In Progress', 'c85bead8-927d-4db0-925c-422d17ef62b9');
INSERT INTO "Project" ("id", "name", "description", "status", "organizationId") VALUES ('61a0da01-1cb6-419a-9903-c30a3733e665', 'Website Redesign', 'Revamping the company website for better user experience.', 'Completed', '4284fd7a-8c4e-4a74-9512-5ec31fa6565a');
INSERT INTO "Project" ("id", "name", "description", "status", "organizationId") VALUES ('4fffb77b-36b1-4306-ab88-917d4c8b3fc5', 'Website Redesign', 'Revamping the company website for better user experience.', 'Cancelled', '595f22e5-8dc5-47b0-a0f2-827862ed1da5');
INSERT INTO "Project" ("id", "name", "description", "status", "organizationId") VALUES ('d6b3a4f5-e537-4ac6-a338-31d35429de57', 'Product Launch', 'Revamping the company website for better user experience.', 'Cancelled', '4284fd7a-8c4e-4a74-9512-5ec31fa6565a');
INSERT INTO "Project" ("id", "name", "description", "status", "organizationId") VALUES ('ce4a3478-40a8-4e87-888e-22d5295c230b', 'Customer Feedback Analysis', 'Launching the new product line in the upcoming quarter.', 'Completed', 'c85bead8-927d-4db0-925c-422d17ef62b9');
INSERT INTO "Project" ("id", "name", "description", "status", "organizationId") VALUES ('761686d6-6466-4499-b87e-afaa4108664a', 'Product Launch', 'Executing a digital marketing campaign for brand awareness.', 'On Hold', '73f14f1a-0ace-4c2d-a452-bc45d2c25fa1');
INSERT INTO "Project" ("id", "name", "description", "status", "organizationId") VALUES ('2e98a238-d079-436f-816b-1e4a5bc09515', 'Mobile App Development', 'Analyzing customer feedback to improve service offerings.', 'Cancelled', '45ebb5ea-e308-4f32-b85e-f0b473872148');
INSERT INTO "Project" ("id", "name", "description", "status", "organizationId") VALUES ('e918af0f-15d9-4935-b188-216cc9b10aad', 'Customer Feedback Analysis', 'Analyzing customer feedback to improve service offerings.', 'Pending', '30aa947f-928c-45fe-9bd7-404ee4ee2ac7');
INSERT INTO "Project" ("id", "name", "description", "status", "organizationId") VALUES ('b5d506dc-8f1c-404d-b966-b56cc30095b2', 'Website Redesign', 'Analyzing customer feedback to improve service offerings.', 'Completed', 'c85bead8-927d-4db0-925c-422d17ef62b9');

INSERT INTO "Group" ("id", "name", "description", "organizationId") VALUES ('1f9f9a01-6612-46a4-97e4-85ee04d8d530', 'Monthly Book Club', 'Keeping track of shared household expenses.', 'e806c9bf-0de4-40fe-a1db-e2248b7f2ac6');
INSERT INTO "Group" ("id", "name", "description", "organizationId") VALUES ('4c2d4eb5-5b61-4041-b1eb-a2a752cd86b8', 'Roommate Expense Pool', 'Splitting lunch expenses among colleagues.', '4284fd7a-8c4e-4a74-9512-5ec31fa6565a');
INSERT INTO "Group" ("id", "name", "description", "organizationId") VALUES ('5d40297e-2b55-45cb-aeae-d2b158d0fde2', 'Office Lunch Squad', 'Keeping track of shared household expenses.', 'aa444bfb-1028-4ebb-be60-6086ad9a2b32');
INSERT INTO "Group" ("id", "name", "description", "organizationId") VALUES ('1decf321-042a-4a22-8e2a-eb64a9b636d0', 'Monthly Book Club', 'Manage shared costs for book club meetings.', '4284fd7a-8c4e-4a74-9512-5ec31fa6565a');
INSERT INTO "Group" ("id", "name", "description", "organizationId") VALUES ('e64bf3ea-822a-41a9-b037-8a239206bfee', 'Family Vacation Fund', 'Splitting lunch expenses among colleagues.', 'c85bead8-927d-4db0-925c-422d17ef62b9');
INSERT INTO "Group" ("id", "name", "description", "organizationId") VALUES ('7a6e1707-7c90-403e-ac2e-11efa9105b69', 'Family Vacation Fund', 'Tracking expenses for our monthly trips.', 'e806c9bf-0de4-40fe-a1db-e2248b7f2ac6');
INSERT INTO "Group" ("id", "name", "description", "organizationId") VALUES ('0a01381f-7550-4c20-bdde-c51612dfb2f2', 'Weekend Getaway Crew', 'Tracking expenses for our monthly trips.', '73f14f1a-0ace-4c2d-a452-bc45d2c25fa1');
INSERT INTO "Group" ("id", "name", "description", "organizationId") VALUES ('6d166ef0-233d-4488-bdf2-9f20c494939c', 'Roommate Expense Pool', 'Saving and tracking expenses for family trips.', '30aa947f-928c-45fe-9bd7-404ee4ee2ac7');
INSERT INTO "Group" ("id", "name", "description", "organizationId") VALUES ('6057496c-d9a2-462b-9a8c-b96b409b0678', 'Roommate Expense Pool', 'Splitting lunch expenses among colleagues.', 'e806c9bf-0de4-40fe-a1db-e2248b7f2ac6');
INSERT INTO "Group" ("id", "name", "description", "organizationId") VALUES ('fa060c07-0e13-4723-a666-f6be5f48163d', 'Office Lunch Squad', 'Tracking expenses for our monthly trips.', '45ebb5ea-e308-4f32-b85e-f0b473872148');

INSERT INTO "Expense" ("id", "amount", "description", "date", "isRecurring", "recurringSchedule", "taxCategory", "organizationId", "userId", "categoryId", "projectId", "groupId") VALUES ('9d7966d6-ae8a-4818-b5a5-0627d881a503', '45.67', 'Grocery shopping', '2025-09-13T11:41:45.271Z', true, 'Biweekly', 'Health  Fitness', '4284fd7a-8c4e-4a74-9512-5ec31fa6565a', '3485bf1d-eba7-4651-b8cc-a58ebcafa608', 'a3b028ff-449f-4f9c-8a85-80ed54641d91', 'ce4a3478-40a8-4e87-888e-22d5295c230b', '0a01381f-7550-4c20-bdde-c51612dfb2f2');
INSERT INTO "Expense" ("id", "amount", "description", "date", "isRecurring", "recurringSchedule", "taxCategory", "organizationId", "userId", "categoryId", "projectId", "groupId") VALUES ('767c1fec-1e2f-4629-b707-acb499334834', '45.67', 'Office supplies', '2025-10-11T08:58:17.396Z', true, 'Monthly', 'Health  Fitness', 'aa444bfb-1028-4ebb-be60-6086ad9a2b32', '6197ab9f-9165-48a0-89f5-e897735d0dba', 'c92db753-f5ae-41ba-97fb-d09537e608cb', '4fffb77b-36b1-4306-ab88-917d4c8b3fc5', '1decf321-042a-4a22-8e2a-eb64a9b636d0');
INSERT INTO "Expense" ("id", "amount", "description", "date", "isRecurring", "recurringSchedule", "taxCategory", "organizationId", "userId", "categoryId", "projectId", "groupId") VALUES ('0da302b8-c542-45b0-b790-5f5b148e84fa', '15.75', 'Office supplies', '2025-07-06T00:29:25.394Z', true, 'Monthly', 'Entertainment', '1a34865a-2bfb-45a2-bf27-61be462b09f2', 'b04610da-ca85-46fe-b72f-3d3458afc4f9', 'a3f10c64-5d13-488d-b161-f11ccb23910f', 'ce4a3478-40a8-4e87-888e-22d5295c230b', 'e64bf3ea-822a-41a9-b037-8a239206bfee');
INSERT INTO "Expense" ("id", "amount", "description", "date", "isRecurring", "recurringSchedule", "taxCategory", "organizationId", "userId", "categoryId", "projectId", "groupId") VALUES ('68999b96-8ef9-493a-be6a-96df8111c373', '250.50', 'Office supplies', '2024-12-13T15:26:10.845Z', false, 'Biweekly', 'Utilities', '45ebb5ea-e308-4f32-b85e-f0b473872148', 'db2e4551-3e0b-41de-8db5-f0838648bf98', 'a3f10c64-5d13-488d-b161-f11ccb23910f', 'd6b3a4f5-e537-4ac6-a338-31d35429de57', '6057496c-d9a2-462b-9a8c-b96b409b0678');
INSERT INTO "Expense" ("id", "amount", "description", "date", "isRecurring", "recurringSchedule", "taxCategory", "organizationId", "userId", "categoryId", "projectId", "groupId") VALUES ('c6eecf09-577f-45c5-88b2-f6bdc2fd55a1', '15.75', 'Monthly subscription', '2024-09-28T21:05:48.487Z', true, 'Monthly', 'Health  Fitness', '30aa947f-928c-45fe-9bd7-404ee4ee2ac7', 'a1284d66-0014-4938-9e4d-4a32f6b9b98e', 'a3f10c64-5d13-488d-b161-f11ccb23910f', 'ce4a3478-40a8-4e87-888e-22d5295c230b', 'fa060c07-0e13-4723-a666-f6be5f48163d');
INSERT INTO "Expense" ("id", "amount", "description", "date", "isRecurring", "recurringSchedule", "taxCategory", "organizationId", "userId", "categoryId", "projectId", "groupId") VALUES ('fea1de6a-4134-429d-9332-dd51addc7fb8', '15.75', 'Monthly subscription', '2025-03-11T14:29:24.899Z', false, 'Annually', 'Office Supplies', '1a34865a-2bfb-45a2-bf27-61be462b09f2', 'b04610da-ca85-46fe-b72f-3d3458afc4f9', '8d8268bf-e5dc-4ac4-bd54-35f7a03d2df3', 'fb62bcf2-3a6e-435e-abfa-a780613f1e34', '6057496c-d9a2-462b-9a8c-b96b409b0678');
INSERT INTO "Expense" ("id", "amount", "description", "date", "isRecurring", "recurringSchedule", "taxCategory", "organizationId", "userId", "categoryId", "projectId", "groupId") VALUES ('18601d55-07ab-4e3f-977b-4e3d1559f97b', '45.67', 'Office supplies', '2024-09-13T12:02:35.311Z', true, 'Annually', 'Food  Beverage', '30aa947f-928c-45fe-9bd7-404ee4ee2ac7', 'a1284d66-0014-4938-9e4d-4a32f6b9b98e', 'a3b028ff-449f-4f9c-8a85-80ed54641d91', 'b5d506dc-8f1c-404d-b966-b56cc30095b2', 'fa060c07-0e13-4723-a666-f6be5f48163d');
INSERT INTO "Expense" ("id", "amount", "description", "date", "isRecurring", "recurringSchedule", "taxCategory", "organizationId", "userId", "categoryId", "projectId", "groupId") VALUES ('8a1b6990-3563-4ecb-9be7-a111044b98cc', '45.67', 'Grocery shopping', '2025-04-14T01:45:06.365Z', true, 'Weekly', 'Health  Fitness', 'c85bead8-927d-4db0-925c-422d17ef62b9', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '0f2ba6c3-43f3-4a5b-a1e1-8de2572ff815', 'fb62bcf2-3a6e-435e-abfa-a780613f1e34', 'fa060c07-0e13-4723-a666-f6be5f48163d');
INSERT INTO "Expense" ("id", "amount", "description", "date", "isRecurring", "recurringSchedule", "taxCategory", "organizationId", "userId", "categoryId", "projectId", "groupId") VALUES ('22f285f0-6391-48b8-b298-761085137e13', '15.75', 'Grocery shopping', '2024-04-14T14:23:02.474Z', true, 'Annually', 'Health  Fitness', 'aa444bfb-1028-4ebb-be60-6086ad9a2b32', '3485bf1d-eba7-4651-b8cc-a58ebcafa608', 'c92db753-f5ae-41ba-97fb-d09537e608cb', 'b5d506dc-8f1c-404d-b966-b56cc30095b2', '1decf321-042a-4a22-8e2a-eb64a9b636d0');
INSERT INTO "Expense" ("id", "amount", "description", "date", "isRecurring", "recurringSchedule", "taxCategory", "organizationId", "userId", "categoryId", "projectId", "groupId") VALUES ('d77a5f4a-6474-427c-9697-474edc89acdc', '15.75', 'Grocery shopping', '2025-09-08T13:10:37.698Z', false, 'Quarterly', 'Utilities', 'e806c9bf-0de4-40fe-a1db-e2248b7f2ac6', 'db2e4551-3e0b-41de-8db5-f0838648bf98', 'a55b8507-7db1-4561-891f-333cecd9d58d', 'd6b3a4f5-e537-4ac6-a338-31d35429de57', '6d166ef0-233d-4488-bdf2-9f20c494939c');

INSERT INTO "GroupMember" ("id", "permissionLevel", "groupId", "userId") VALUES ('6c1c2f81-5e01-42ce-a331-9ad686f0a8ee', 'contributor', '7a6e1707-7c90-403e-ac2e-11efa9105b69', 'db2e4551-3e0b-41de-8db5-f0838648bf98');
INSERT INTO "GroupMember" ("id", "permissionLevel", "groupId", "userId") VALUES ('6701c671-ba89-4406-97eb-1e9fdb3dba7f', 'contributor', '0a01381f-7550-4c20-bdde-c51612dfb2f2', 'a5488b8e-a7c9-45ae-ba5b-4bdaab23a65f');
INSERT INTO "GroupMember" ("id", "permissionLevel", "groupId", "userId") VALUES ('ec85a139-1552-4135-a7f8-a9b07cd0adf7', 'contributor', '1f9f9a01-6612-46a4-97e4-85ee04d8d530', '8183265a-5550-490c-8973-e46a5998af22');
INSERT INTO "GroupMember" ("id", "permissionLevel", "groupId", "userId") VALUES ('bc0fba11-bfc6-49c6-bebd-65555d2a8ecb', 'editor', '1decf321-042a-4a22-8e2a-eb64a9b636d0', 'db2e4551-3e0b-41de-8db5-f0838648bf98');
INSERT INTO "GroupMember" ("id", "permissionLevel", "groupId", "userId") VALUES ('c4f29aec-33a3-42ce-ba15-a9769f57e773', 'editor', '7a6e1707-7c90-403e-ac2e-11efa9105b69', '61c0b1ab-82cc-4aad-88ba-3254f17b7797');
INSERT INTO "GroupMember" ("id", "permissionLevel", "groupId", "userId") VALUES ('7da48bc6-cae7-40ae-b68a-54985b2578d7', 'viewer', '7a6e1707-7c90-403e-ac2e-11efa9105b69', '61c0b1ab-82cc-4aad-88ba-3254f17b7797');
INSERT INTO "GroupMember" ("id", "permissionLevel", "groupId", "userId") VALUES ('6d780004-2a74-4441-9e6c-8b6df7ba9579', 'viewer', '6d166ef0-233d-4488-bdf2-9f20c494939c', '6197ab9f-9165-48a0-89f5-e897735d0dba');
INSERT INTO "GroupMember" ("id", "permissionLevel", "groupId", "userId") VALUES ('770d434e-eb88-4673-ae93-15ecc800fc6f', 'admin', '4c2d4eb5-5b61-4041-b1eb-a2a752cd86b8', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "GroupMember" ("id", "permissionLevel", "groupId", "userId") VALUES ('1c0ab719-29e0-455b-82f3-b54c8fcc066e', 'admin', '6d166ef0-233d-4488-bdf2-9f20c494939c', 'b04610da-ca85-46fe-b72f-3d3458afc4f9');
INSERT INTO "GroupMember" ("id", "permissionLevel", "groupId", "userId") VALUES ('fd684293-c221-47fc-839d-8b8a12d5253d', 'admin', '1decf321-042a-4a22-8e2a-eb64a9b636d0', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "Payment" ("id", "amount", "paymentMethod", "status", "organizationId", "userId", "expenseId") VALUES ('0cd5c0a8-f7a8-475c-97c0-1b29afedf61a', '350.25', 'mobile wallet', 'failed', '4284fd7a-8c4e-4a74-9512-5ec31fa6565a', '3485bf1d-eba7-4651-b8cc-a58ebcafa608', 'c6eecf09-577f-45c5-88b2-f6bdc2fd55a1');
INSERT INTO "Payment" ("id", "amount", "paymentMethod", "status", "organizationId", "userId", "expenseId") VALUES ('486445f2-0b42-4567-9357-dde388f1d7f7', '350.25', 'credit card', 'completed', '30aa947f-928c-45fe-9bd7-404ee4ee2ac7', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '8a1b6990-3563-4ecb-9be7-a111044b98cc');
INSERT INTO "Payment" ("id", "amount", "paymentMethod", "status", "organizationId", "userId", "expenseId") VALUES ('1d66e26a-10c0-4a0f-ae04-0a1909a0f377', '45.67', 'mobile wallet', 'completed', '9c84b352-f7cb-461c-b76d-35421b7e6562', 'a1284d66-0014-4938-9e4d-4a32f6b9b98e', '8a1b6990-3563-4ecb-9be7-a111044b98cc');
INSERT INTO "Payment" ("id", "amount", "paymentMethod", "status", "organizationId", "userId", "expenseId") VALUES ('ee304fa6-4804-4b94-9efc-b6fe2005b766', '15.50', 'mobile wallet', 'pending', '73f14f1a-0ace-4c2d-a452-bc45d2c25fa1', 'a4bf9319-5fe2-40a3-8cb4-e1795974cf1f', '22f285f0-6391-48b8-b298-761085137e13');
INSERT INTO "Payment" ("id", "amount", "paymentMethod", "status", "organizationId", "userId", "expenseId") VALUES ('6af82cc2-b5b7-4d89-b4da-d347acf0b448', '15.50', 'mobile wallet', 'pending', 'e806c9bf-0de4-40fe-a1db-e2248b7f2ac6', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '22f285f0-6391-48b8-b298-761085137e13');
INSERT INTO "Payment" ("id", "amount", "paymentMethod", "status", "organizationId", "userId", "expenseId") VALUES ('2c439503-38bc-4389-8317-ab6401bce48b', '89.99', 'mobile wallet', 'completed', '45ebb5ea-e308-4f32-b85e-f0b473872148', 'a1284d66-0014-4938-9e4d-4a32f6b9b98e', '68999b96-8ef9-493a-be6a-96df8111c373');
INSERT INTO "Payment" ("id", "amount", "paymentMethod", "status", "organizationId", "userId", "expenseId") VALUES ('50d30bcc-9f1e-4e8c-a28b-6d08c380bf4a', '120.00', 'mobile wallet', 'failed', '4284fd7a-8c4e-4a74-9512-5ec31fa6565a', 'a1284d66-0014-4938-9e4d-4a32f6b9b98e', '18601d55-07ab-4e3f-977b-4e3d1559f97b');
INSERT INTO "Payment" ("id", "amount", "paymentMethod", "status", "organizationId", "userId", "expenseId") VALUES ('03a75366-9982-4739-a8ec-d7400e48a5fc', '120.00', 'PayPal', 'failed', '595f22e5-8dc5-47b0-a0f2-827862ed1da5', 'db2e4551-3e0b-41de-8db5-f0838648bf98', '22f285f0-6391-48b8-b298-761085137e13');
INSERT INTO "Payment" ("id", "amount", "paymentMethod", "status", "organizationId", "userId", "expenseId") VALUES ('8e7ea70e-1e09-436e-86c1-5bd01335d3ea', '120.00', 'debit card', 'completed', '73f14f1a-0ace-4c2d-a452-bc45d2c25fa1', 'a5488b8e-a7c9-45ae-ba5b-4bdaab23a65f', '22f285f0-6391-48b8-b298-761085137e13');
INSERT INTO "Payment" ("id", "amount", "paymentMethod", "status", "organizationId", "userId", "expenseId") VALUES ('1b79bab0-96d6-4585-8df2-5683df4b3661', '120.00', 'PayPal', 'completed', 'aa444bfb-1028-4ebb-be60-6086ad9a2b32', 'db2e4551-3e0b-41de-8db5-f0838648bf98', 'd77a5f4a-6474-427c-9697-474edc89acdc');

INSERT INTO "Notification" ("id", "type", "message", "status", "referenceId", "userId") VALUES ('1b0fd942-9274-4a00-9d13-d5927a258525', 'Savings Goal Achievement', 'You have reached 90 of your food budget for this month.', 'unread', 'daf66527-f6d4-47ed-b836-e86f17f9d5ee', 'a4bf9319-5fe2-40a3-8cb4-e1795974cf1f');
INSERT INTO "Notification" ("id", "type", "message", "status", "referenceId", "userId") VALUES ('5b07be4d-b5ca-4efb-ab14-a77ec54306f6', 'Recurring Expense Alert', 'Significant spending detected in your travel category.', 'read', '441c17f7-5278-4560-b483-796a622a5cbb', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Notification" ("id", "type", "message", "status", "referenceId", "userId") VALUES ('b9c20ce9-ae86-4a4c-a179-6058b01b0381', 'Spending Change Notification', 'Congratulations Youve achieved your savings goal for this quarter.', 'unread', '6f983bc1-2091-40c7-8051-f1fa7d282a82', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Notification" ("id", "type", "message", "status", "referenceId", "userId") VALUES ('4f9331b5-421a-4721-8451-a08049f3537e', 'Bill Due Reminder', 'Congratulations Youve achieved your savings goal for this quarter.', 'unread', '00f26a54-8285-4b1c-a2a4-044a9196b5e9', 'a1284d66-0014-4938-9e4d-4a32f6b9b98e');
INSERT INTO "Notification" ("id", "type", "message", "status", "referenceId", "userId") VALUES ('b4a1ddbd-2f0f-4abf-a7cb-ef98702dfd1b', 'Spending Change Notification', 'Significant spending detected in your travel category.', 'unread', 'c3c0e495-6710-4d1c-bf99-90f3a345a68a', '6197ab9f-9165-48a0-89f5-e897735d0dba');
INSERT INTO "Notification" ("id", "type", "message", "status", "referenceId", "userId") VALUES ('b5cfb880-9f79-47fa-8f0c-7702875c8993', 'Recurring Expense Alert', 'Your electricity bill is due in 3 days.', 'unread', '3337d1ae-4ed8-40f7-84ff-3c450a6699fa', 'db2e4551-3e0b-41de-8db5-f0838648bf98');
INSERT INTO "Notification" ("id", "type", "message", "status", "referenceId", "userId") VALUES ('8dce4e84-0b2c-4651-84ce-f923fcc6d916', 'Budget Limit Alert', 'Congratulations Youve achieved your savings goal for this quarter.', 'unread', '6be0a77a-f2ab-4a74-bb0b-1fd2e0872030', 'a4bf9319-5fe2-40a3-8cb4-e1795974cf1f');
INSERT INTO "Notification" ("id", "type", "message", "status", "referenceId", "userId") VALUES ('2a474da0-9021-4508-86a8-89afaf81f6cb', 'Budget Limit Alert', 'You have reached 90 of your food budget for this month.', 'unread', 'f3225a21-8503-4d1a-b027-a943474e4830', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Notification" ("id", "type", "message", "status", "referenceId", "userId") VALUES ('0cd25e88-cbec-442f-a5d3-5a36dd4c89c1', 'Savings Goal Achievement', 'You have reached 90 of your food budget for this month.', 'unread', '439f12e3-552e-41f8-9a73-6785eb75b969', '3485bf1d-eba7-4651-b8cc-a58ebcafa608');
INSERT INTO "Notification" ("id", "type", "message", "status", "referenceId", "userId") VALUES ('28390610-0c42-4d90-99a2-4a2b4a39353d', 'Budget Limit Alert', 'Your monthly subscription for music streaming is due tomorrow.', 'unread', '735b0c90-2560-4d34-a80a-7e799d4b3570', 'a1284d66-0014-4938-9e4d-4a32f6b9b98e');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
