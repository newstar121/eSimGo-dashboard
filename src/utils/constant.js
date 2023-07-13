import Payment from 'payment'

export const API_KEY = 'RhFtBn4Hx24kXkAZ7GrM1fSmngpsvZnfyHLbhpC8'
export const API_URL = 'https://api.esim-go.com/v2.2/'
export const LOGIN_TOKEN = 'YmcubmV3c3RhcjEyMUBnbWFpbC5jb206T2xla3NhbmRyMTIk'

export const USER_ROLE = {
    company: 'company',
    reseller: 'reseller',
    user: 'user',
}

export const DISPLAY_TYPE = {
    cost: 'cost',
    quantity: 'quantity'
}

export const DISPLAY_TYPE_NAME = {
    cost: 'Cost',
    quantity: 'Quantity'
}

export const REGION_TYPE = {
    all: 'all',
    africa: 'africa',
    asia: 'asia',
    Europe: 'Europe',
    north: 'north',
    oceania: 'oceania',
    africa: 'africa',
    south: 'south',
}

export const REGION_TYPE_NAME = {
    all: 'All Regions',
    africa: 'Africa',
    asia: 'Asia',
    Europe: 'Europe',
    north: 'North America',
    oceania: 'Oceania',
    africa: 'Africa',
    south: 'South America',
}

function clearNumber(value = '') {
    return value.replace(/\D+/g, '')
}

export function formatCreditCardNumber(value) {
    if (!value) {
        return value
    }

    const issuer = Payment.fns.cardType(value)
    const clearValue = clearNumber(value)
    let nextValue

    switch (issuer) {
        case 'amex':
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
                4,
                10
            )} ${clearValue.slice(10, 15)}`
            break
        case 'dinersclub':
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
                4,
                10
            )} ${clearValue.slice(10, 14)}`
            break
        default:
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
                4,
                8
            )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`
            break
    }

    return nextValue.trim()
}

export function formatCVC(value, prevValue, allValues = {}) {
    const clearValue = clearNumber(value)
    let maxLength = 3

    if (allValues.number) {
        const issuer = Payment.fns.cardType(allValues.number)
    }

    return clearValue.slice(0, maxLength)
}

export function formatExpirationDate(value) {
    const clearValue = clearNumber(value)

    if (clearValue.length >= 3) {
        return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`
    }

    return clearValue
}
