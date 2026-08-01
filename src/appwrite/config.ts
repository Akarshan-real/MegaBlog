import secret from '../config/config';
import { Client, ID, Query, Storage, TablesDB, type Models } from "appwrite";
import { type PostType } from '../Types/Post.type'
import type { AppWriteExtendedTableType } from '../Types/Extended.table.type';
export class Service {
    client = new Client();
    table;
    storage;

    constructor() {
        this.client.setEndpoint(secret.appWriteUrl).setProject(secret.appWriteProjectId);

        this.table = new TablesDB(this.client);

        this.storage = new Storage(this.client);
    };

    createPost = async ({ title, slug, content, featuredImage, status, userId }: PostType & { slug: string }) => {
        try {
            return await this.table.createRow({
                databaseId: secret.appWriteDataBaseId,
                tableId: secret.appWriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            });
        }
        catch (error) {
            console.log("Appwrite error :: ", error);
            return null;
        }
    };

    updatePost = async (slug: string, { title, content, featuredImage, status }: Omit<PostType, "userId" | "featuredImage"> & { featuredImage?: string }) => {
        try {
            return await this.table.updateRow({
                databaseId: secret.appWriteDataBaseId,
                tableId: secret.appWriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status
                }
            });
        } catch (error) {
            throw error;
        };
    };

    deletePost = async (slug: string) => {
        try {
            await this.table.deleteRow({
                databaseId: secret.appWriteDataBaseId,
                tableId: secret.appWriteTableId,
                rowId: slug
            });
            return true;
        }
        catch (error) {
            console.log("Appwrite error :: ", error);
            return false;
        }
    };

    getPost = async (slug: string): Promise<AppWriteExtendedTableType | null> => {
        try {
            return await this.table.getRow<AppWriteExtendedTableType>({
                databaseId: secret.appWriteDataBaseId,
                tableId: secret.appWriteTableId,
                rowId: slug
            });
        }
        catch (error) {
            console.log("Appwrite error :: ", error);
            return null;
        }
    };

    getPosts = async (queries: string[] = [Query.equal("status", "active")]): Promise<Models.RowList<AppWriteExtendedTableType> | null> => {
        try {
            return await this.table.listRows<AppWriteExtendedTableType>({
                databaseId: secret.appWriteDataBaseId,
                tableId: secret.appWriteTableId,
                queries: queries
            });
        }
        catch (error) {
            console.log("Appwrite error :: ", error);
            return null;
        }
    };

    getPostsByStatus = async (status: "active" | "inactive" = "active") => {
        try {
            return await this.table.listRows({
                databaseId: secret.appWriteDataBaseId,
                tableId: secret.appWriteTableId,
                queries: [Query.equal("status", status)]
            })
        } catch (error) {
            console.log("Appwrite error :: ", error);
            return false;
        }
    };

    getSlugsByUserId = async (userId: string): Promise<string[] | null> => {
        try {
            const response = await this.table.listRows({
                databaseId: secret.appWriteDataBaseId,
                tableId: secret.appWriteTableId,
                queries: [
                    Query.equal("userId", userId),
                    Query.select(["$id"])
                ]
            });

            return response.rows.map(row => row.$id);
        } catch (error) {
            console.log("Appwrite error :: ", error);
            return null;
        };
    };

    getPostsByUserId = async (userId: string): Promise<Models.RowList<AppWriteExtendedTableType> | null> => {
        try {
            return this.table.listRows<AppWriteExtendedTableType>({
                databaseId: secret.appWriteDataBaseId,
                tableId: secret.appWriteTableId,
                queries: [Query.equal("userId", userId)]
            });
        } catch (error) {
            console.log("Appwrite error :: ", error);
            return null;
        }
    };

    getPostsBySlugs = async (slugs : string []): Promise<Models.RowList<AppWriteExtendedTableType> | null> => {
        try {
            return this.table.listRows({
                databaseId : secret.appWriteDataBaseId,
                tableId : secret.appWriteTableId,
                queries : [Query.equal("$id",slugs)]
            })
        } catch (error) {
            console.log("Appwrite error :: ", error);
            return null;
        }
    };

    uploadFile = async (file: File) => {
        try {
            return await this.storage.createFile({
                bucketId: secret.appWriteBucketId,
                fileId: ID.unique(),
                file: file
            })
        }
        catch (error) {
            console.log("Appwrite error :: ", error);
            return false;
        }
    };

    deleteFile = async (fileId: string) => {
        try {
            await this.storage.deleteFile({
                bucketId: secret.appWriteBucketId,
                fileId: fileId
            });
            return true;
        }
        catch (error) {
            console.log("Appwrite error :: ", error);
            return false;
        }
    };

    getFileView = (fileId: string) => {
        try {
            return this.storage.getFileView({
                bucketId: secret.appWriteBucketId,
                fileId: fileId
            });
        } catch (error) {
            console.log("Appwrite error :: ", error);
        };
    };
};

const newService = new Service();

export default newService;