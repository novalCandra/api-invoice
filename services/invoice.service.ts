import { invoice_status } from "../generated/prisma/enums.js";
import prisma from "../config/prisma.js";
import { InvoiceResponseDTO } from "../src/dto/invoice.dto.js";
export const AllInvoiceData = async (userId: number, clientId: number) => {
    const InvoiceAll = await prisma.invoice.findMany({
        where: {
            userId,
            ...(clientId && { clientId })
        },
        include: {
            user: {
                select: {
                    id: true,
                    nama: true,
                    email: true,
                    role: true
                }
            },
            client: {
                select: {
                    id: true,
                    nama: true,
                    email: true,
                    phone: true,
                    compay: true
                }
            }
        }
    });

    if (!InvoiceAll) {
        const error = new Error("Not Invoice All")
        throw error
    }
    return InvoiceAll;
}

export const InvoiceDataDetails = async (id: number) => {
    const detailInvoice = await prisma.invoice.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            user: {
                select: {
                    id: true,
                    nama: true,
                    email: true,
                    role: true
                }
            },
            client: {
                select: {
                    id: true,
                    nama: true,
                    email: true,
                    phone: true,
                    compay: true
                }
            },
            customization: {
                select: {
                    text_color: true,
                    background_color: true,
                    accent_color: true,
                    custom_colors: true
                }
            },
            items: {
                select: {
                    id: true,
                    description: true,
                    amount: true,
                    quantity: true,
                    unit_price: true,
                }
            }
        }
    })

    if (!detailInvoice) {
        const error = new Error("Not Invoice Details data")
        throw error
    }

    return detailInvoice
}

export const postInvoiceServices = async (userId: number, clientId: number, body: {
    client_name: string, status: string, amount: number, date: string, dueData: string, description: string, notes: string,
    items: {
        description: string;
        quantity: number;
        unitPrice: number;
    }[];
    customization: {
        textColor: string;
        backgroundColor: string;
        accentColor: string;
        customColors: boolean;
    };

}) => {
    const { client_name, status, amount, date, dueData, description, notes, items,
        customization } = body;
    const createInvoice = await prisma.invoice.create({
        data: {
            client_name, status: status as invoice_status, amount, date: new Date(date), dueData: new Date(dueData), description, notes, user: {
                connect: {
                    id: userId
                },
            }, client: {
                connect: {
                    id: clientId
                }
            },
            items: {
                create: items.map((item) => ({
                    description: item.description,
                    quantity: item.quantity,
                    unit_price: item.unitPrice,
                    amount: item.quantity * item.unitPrice,
                    user: {
                        connect: {
                            id: userId
                        }
                    }
                }))
            },
            customization: {
                create: {
                    text_color: customization.textColor,
                    background_color: customization.backgroundColor,
                    accent_color: customization.accentColor,
                    custom_colors: customization.customColors
                }
            }
        },
        include: {
            user: {
                select: {
                    id: true,
                    nama: true
                }
            },
            client: {
                select: {
                    id: true,
                    nama: true,
                    email: true,
                    phone: true,
                    compay: true
                }
            },
            items: true,
            customization: true
        },
    })

    if (!createInvoice) {
        const error = new Error("False Create Invoice Data");
        throw error
    }
    return new InvoiceResponseDTO(createInvoice);
}


export const updateInvoiceServices = async (userId: number, clientId: number, id: number, body: {
    client_name: string, status: string, amount: number, date: string, dueData: string, description: string, notes: string,
    items: {
        description: string;
        quantity: number;
        unitPrice: number;
    }[];
    customization: {
        textColor: string;
        backgroundColor: string;
        accentColor: string;
        customColors: boolean;
    };
}) => {
    const { client_name, status, amount, date, dueData, description, notes, items,
        customization } = body;
    const updateInvoice = await prisma.invoice.update({
        where: {
            id
        },
        data: {
            client_name, status: status as invoice_status, amount, date: new Date(date), dueData: new Date(dueData), description, notes, user: {
                connect: {
                    id: userId
                }
            },
            client: {
                connect: {
                    id: clientId
                }
            },
            items: {
                // deleteMany: {},
                create: items.map((item) => ({
                    description: item.description,
                    quantity: item.quantity,
                    unit_price: item.unitPrice,
                    amount: item.quantity * item.unitPrice,
                    user: {
                        connect: {
                            id: userId
                        }
                    }
                }))
            },
            customization: {
                // deleteMany: {},
                create: {
                    text_color: customization.textColor,
                    background_color: customization.backgroundColor,
                    accent_color: customization.accentColor,
                    custom_colors: customization.customColors
                }
            }
        },
        include: {
            user: {
                select: {
                    id: true,
                    nama: true
                }
            },
            client: {
                select: {
                    id: true,
                    nama: true,
                    email: true,
                    phone: true,
                    compay: true
                }
            },
            items: true,
            customization: true
        },
    })
    return new InvoiceResponseDTO(updateInvoice);
}

export const deleteInvoiceServices = async (invoiceId: number) => {
    await prisma.invoice_items.deleteMany({
        where: {
            invoiceId: Number(invoiceId)
        }
    })
    await prisma.invoice_customizations.deleteMany({
        where: {
            invoiceId: Number(invoiceId)
        }
    })
    await prisma.invoice_reminders.deleteMany({
        where: {
            invoiceId: Number(invoiceId)
        }
    })

    await prisma.activity_log.deleteMany({
        where: {
            invoiceId: Number(invoiceId)
        }
    })

    const deleteInvoice = await prisma.invoice.delete({
        where: {
            id: Number(invoiceId)
        }
    })
    return deleteInvoice;
}